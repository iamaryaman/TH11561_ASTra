import csv 
import requests
import json
import math
import os


def dataset_list(search):
    File = open("dataset.csv","r",newline="")
    csv_reader = csv.reader(File)
    for i in csv_reader:
        if i[3] == search:
            focused_list = i
            return focused_list
            break
            
def get_route_instructions(start_lat, start_lon, dest_lat, dest_lon):
    api_url = f"https://router.osrm.org/route/v1/driving/{start_lon},{start_lat};{dest_lon},{dest_lat}?steps=true"

    print("\nFetching directions...")
    print(f"Attempting to connect to: {api_url}")

    try:
        response = requests.get(api_url, timeout=15)
        response.raise_for_status()
        data = response.json()

        if data.get('code') != 'Ok':
            print(f"API returned an error: {data.get('message', 'Unknown error')}")
            return []
        
        route = data['routes'][0]
        legs = route['legs'][0]
        steps = legs['steps']

        instructions = []
        print("Route found!")
        print("-" * 20)
        
        # the instructions for the user
        for i, step in enumerate(steps):
            maneuver = step['maneuver']
            instruction_text = maneuver['instruction']
            distance_meters = step['distance']
            # Convert distance to a more readable format (km)
            distance_km = round(distance_meters / 1000, 2)
            
            full_instruction = f"{i+1}. {instruction_text} (for {distance_km} km)"
            instructions.append(full_instruction)

        return instructions

    except requests.exceptions.Timeout:
        print("The request timed out. The server might be too slow or unreachable.")
        return []
    except requests.exceptions.HTTPError as e:
        print(f"HTTP Error: {e}")
        print(f"The server returned an error. Status Code: {response.status_code}")
        print(f"Response Body: {response.text}")
        return []
    except requests.exceptions.RequestException as e:
        print(f"A network error occurred: {e}")
        return []
    except json.JSONDecodeError:
        print("Failed to decode the server's response as JSON.")
        print(f"This usually means the server returned an error page or an empty response.")
        print(f"Status Code: {response.status_code}")
        print(f"Response Body: {response.text}")
        return []
    except (KeyError, IndexError):
        print("Could not parse the route from the API response. The data format may have changed.")
        return []

def calculate_haversine_distance(lat1, lon1, lat2, lon2):
    R = 6371  # Radius of Earth in kilometers
    
    phi1 = math.radians(lat1)
    phi2 = math.radians(lat2)
    delta_phi = math.radians(lat2 - lat1)
    delta_lambda = math.radians(lon2 - lon1)
    
    # Haversine formula calculation
    a = math.sin(delta_phi / 2.0)**2 + \
        math.cos(phi1) * math.cos(phi2) * \
        math.sin(delta_lambda / 2.0)**2
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
    
    distance = R * c
    return distance
    
def find_nearest_destination(user_lat, user_lon, file_path):
    if not os.path.exists(file_path):
        print(f"Error: The file '{file_path}' was not found.")
        return None

    nearest_destination = None
    min_distance = float('inf')

    try:
        with open(file_path, mode='r', encoding='utf-8') as infile:
            reader = csv.reader(infile)
            header = next(reader) 
            
            for row in reader:
                try:
                    if len(row) < 4:
                        continue #for invariant datasets
                        
                    dest_id, dest_lat, dest_lon, dest_name = row
                    dest_lat, dest_lon = float(dest_lat), float(dest_lon)

                    distance = calculate_haversine_distance(
                        user_lat, user_lon, dest_lat, dest_lon
                    )

                    if distance < min_distance:
                        min_distance = distance
                        nearest_destination = {
                            "id": dest_id,
                            "name": dest_name,
                            "lat": dest_lat,
                            "lon": dest_lon,
                            "distance_km": round(min_distance, 2)
                        }
                except (ValueError, IndexError) as e:
                    print(f"Skipping malformed row: {row}. Error: {e}")
                    continue

    except Exception as e:
        print(f"An error occurred while reading the file: {e}")
        return None

    return nearest_destination
    

if __name__ == "__main__":
    user_lat = None
    user_long = None #to be fed using neo6m
    csv_file_name = r"dataset.csv"
    
    print(f"Searching for the nearest destination to your location ({user_lat}, {user_long})...")
    
    # 3. Call the function to find the nearest destination
    nearest = find_nearest_destination(user_lat, user_long, csv_file_name)
    
    destination = dataset_list(nearest) 
    
    for elb in destination:
        selected_lat = elb[1]
        selected_long = elb[2]
    
    if nearest:
        print("\n--- Nearest Destination Found ---")
        print(f"Name: {nearest['name']}")
        print(f"Latitude: {nearest['lat']}")
        print(f"Longitude: {nearest['lon']}")
        print(f"Distance: {nearest['distance_km']} km away")
        print("---------------------------------")
    else:
        print("\nCould not determine the nearest destination.")


    route_steps = get_route_instructions(
        user_lat,
        user_long,
        selected_lat,
        selected_long
    )

    if route_steps:
        print("\n--- Your Directions ---")
        for step in route_steps:
            print(step)
        print("\n--- End of Directions ---") # 
    else:
        print("\nCould not retrieve directions. Please check the error messages above and try again.")
import csv
import math
import os

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
    """
    Returns:
        dict: A dictionary containing the details of the nearest destination
              (id, name, lat, lon, distance_km). Returns None if the file
              is not found or is empty.
    """
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

# --- DEMONSTRATION ---
if __name__ == "__main__":


    
    # This is an external input for the function.
    current_lat = 28.6139
    current_lon = 77.2090
    
    print(f"Searching for the nearest destination to your location ({current_lat}, {current_lon})...")
    
    # 3. Call the function to find the nearest destination
    nearest = find_nearest_destination(current_lat, current_lon, csv_file_name)
    
    # 4. Print the result
    if nearest:
        print("\n--- Nearest Destination Found ---")
        print(f"Name: {nearest['name']}")
        print(f"Latitude: {nearest['lat']}")
        print(f"Longitude: {nearest['lon']}")
        print(f"Distance: {nearest['distance_km']} km away")
        print("---------------------------------")
    else:
        print("\nCould not determine the nearest destination.")

    # Clean up the dummy file
    os.remove(csv_file_name)

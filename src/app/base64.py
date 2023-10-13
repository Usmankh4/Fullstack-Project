import base64

# Replace the file path with the path to your image
image_path = "C:/Users/usman/Pictures/Fast Fix Pictures/iPhone15Pro.jpg"

# Read the image file and encode it as Base64
with open(image_path, "rb") as image_file:
    encoded_string = base64.b64encode(image_file.read()).decode('utf-8')

# Print the Base64-encoded string
print(encoded_string)

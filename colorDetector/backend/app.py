
def detectProperties(path):
    from google.cloud import vision
    import io
    import os
    os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = "C:/Users/ericy/HTH_color/colorDetector/backend/eighth-azimuth-379620-9f35143e3248.json"

    client = vision.ImageAnnotatorClient()

    with io.open(path, 'rb') as imageFile:
        content = imageFile.read()

    image = vision.Image(content=content)
    response = client.image_properties(image=image)
    props = response.image_properties_annotation
    print("Properties: ")

    def rgb_to_hex(r, g, b):
        return "#{:02x}{:02x}{:02x}".format(int(r), int(g), int(b))

    for color in props.dominant_colors.colors:
        r = color.color.red
        g = color.color.green
        b = color.color.blue
        print('fraction: {:.2f}%'.format(color.pixel_fraction*100))
        print('\tr: {}'.format(r))
        print('\tg: {}'.format(g))
        print('\tb: {}'.format(b))
        print('\thex color code: {}'.format(rgb_to_hex(r, g, b)))

    if response.error.message:
        raise Exception(
            '{}\nFor more info on error messages, check: '
            'https://cloud.google.com/apis/design/errors'.format(
                response.error.message))


try:
    file_path = "C:/Users/ericy/OneDrive/Pictures/Camera Roll/WIN_20230304_18_07_20_Pro.jpg"
    detectProperties(file_path)
except Exception as e:
    print("An error occurred: ", e)

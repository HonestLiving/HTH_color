colorList = []
def detectProperties(path):
    from google.cloud import vision
    import io
    import os
    os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = "C:/Users/DESTR/Documents/GitHub/HTH_color/colorDetector/backend/eighth-azimuth-379620-9f35143e3248.json"

    client = vision.ImageAnnotatorClient()
    colorList = []
    with io.open(path, 'rb') as imageFile:
        content = imageFile.read()

    image = vision.Image(content=content)
    response = client.image_properties(image=image)
    props = response.image_properties_annotation
    print("Color Distributions: ")

    def rgb_to_hex(r, g, b):
        return "#{:02x}{:02x}{:02x}".format(int(r), int(g), int(b))

    colors = sorted(props.dominant_colors.colors,
                    key=lambda c: c.pixel_fraction, reverse=True)
    for color in colors:
        r = color.color.red
        g = color.color.green
        b = color.color.blue
        print(f"fraction: {color.pixel_fraction*100:.2f}%")
        print('\thex color code: {}'.format(rgb_to_hex(r, g, b)))
        print()
        
        list.append(colorList, 'hex color code: {}'.format(rgb_to_hex(r, g, b)))

    if response.error.message:
        raise Exception(
            '{}\nFor more info on error messages, check: '
            'https://cloud.google.com/apis/design/errors'.format(
                response.error.message))
    return colorList



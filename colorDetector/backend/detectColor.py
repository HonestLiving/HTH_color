def detectProperties(path):
    from google.cloud import vision
    import io
    import os
    import webcolors
    os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = "C:/Users/ericy/HTH_color/colorDetector/backend/eighth-azimuth-379620-9f35143e3248.json"

    client = vision.ImageAnnotatorClient()

    with io.open(path, 'rb') as imageFile:
        content = imageFile.read()

    image = vision.Image(content=content)
    response = client.image_properties(image=image)
    props = response.image_properties_annotation

    def rgb_to_hex(r, g, b):
        return "#{:02x}{:02x}{:02x}".format(r, g, b)

    def closest_colour(requested_colour):
        min_colours = {}
        for key, name in webcolors.CSS3_HEX_TO_NAMES.items():
            r_c, g_c, b_c = webcolors.hex_to_rgb(key)
            rd = (r_c - requested_colour[0]) ** 2
            gd = (g_c - requested_colour[1]) ** 2
            bd = (b_c - requested_colour[2]) ** 2
            min_colours[(rd + gd + bd)] = name
        return min_colours[min(min_colours.keys())]

    def get_colour_name(requested_colour):
        try:
            closest_name = actual_name = webcolors.rgb_to_name(
                requested_colour)
        except ValueError:
            closest_name = closest_colour(requested_colour)
            actual_name = None
        return actual_name, closest_name

    colors = sorted(props.dominant_colors.colors,
                    key=lambda c: c.pixel_fraction, reverse=True)

    colorList = []
    for color in colors:
        r = int(color.color.red)
        g = int(color.color.green)
        b = int(color.color.blue)
        fraction = color.pixel_fraction
        hexCode = rgb_to_hex(r, g, b)
        requestedColor = (r, g, b)
        actualName, closestName = get_colour_name(requestedColor)
        colorList.append({"fraction": fraction, "hex": hexCode,
                         "actual": actualName, "closest": closestName})

    return colorList


color_list = detectProperties(
    "C:/Users/ericy/HTH_color/colorDetector/backend/pictures/WIN_20230304_18_07_20_Pro.jpg")
for color in color_list:
    fraction_percent = round(color["fraction"] * 100, 2)
    print("Fraction:", f"{fraction_percent}%")
    print("Hex Code:", color["hex"])
    print("Actual color name:", color["actual"])
    print("Closest color name:", color["closest"])
    print()

def resize_image(height, width):
        imageHeight = int(cmd.data['Height'])
        imageWidth = int(cmd.data['Width'])
        print("Images Resized to", imageWidth,"x", imageHeight)

        print("Images not resized, size too large")

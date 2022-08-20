import cv2
import argparse


def get_args():
    parser = argparse.ArgumentParser()
    parser.add_argument('-f', '--file', type=str)
    parser.add_argument('--width', type=int, default=350)
    parser.add_argument('--height', type=int, default=180)
    argument = parser.parse_args()
    return argument


def convert_img_size(file_path, width, height):
    img = cv2.imread(file_path)
    print("img.shape = {0}".format(img.shape))

    resize_img = cv2.resize(img, (width, height))
    print("resize_img.shape = {0}".format(resize_img.shape))

    cv2.imwrite(file_path, resize_img)


if __name__ == '__main__':
    # Get arguments
    args = get_args()
    convert_img_size(args.file, args.width, args.height)
    print(args.file + "Done")

import * as ImagePicker from "expo-image-picker";

class ImagePickerService {
  /**
   * Request permission to access the device gallery.
   * @returns {Promise<boolean>} - Returns true if permission is granted, otherwise false.
   */
  static async requestGalleryPermission(): Promise<boolean> {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Permission to access media library is required!");
      return false;
    }
    return true;
  }

  /**
   * Pick a single image from the device gallery.
   * @param allowsEditing {boolean} - Whether the image should be editable before selection.
   * @param quality {number} - Image quality between 0 and 1.
   * @returns {Promise<string | null>} - Returns the URI of the selected image or null if canceled.
   */
  static async pickSingleImage(
    allowsEditing: boolean = true,
    quality: number = 0.8
  ): Promise<string | null> {
    const hasPermission = await this.requestGalleryPermission();
    if (!hasPermission) return null;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing,
      quality,
    });

    if (!result.canceled && result.assets.length > 0) {
      return result.assets[0].uri;
    }
    return null;
  }

  /**
   * Pick multiple images from the device gallery.
   * @param maxImages {number} - Maximum number of images to pick.
   * @param quality {number} - Image quality between 0 and 1.
   * @returns {Promise<string[]>} - Returns an array of URIs of the selected images.
   */
  static async pickMultipleImages(
    maxImages: number = 6,
    quality: number = 0.8
  ): Promise<string[]> {
    const hasPermission = await this.requestGalleryPermission();
    if (!hasPermission) return [];

    const images: string[] = [];

    for (let i = 0; i < maxImages; i++) {
      const uri = await this.pickSingleImage(false, quality);
      if (uri) {
        images.push(uri);
      } else {
        break;
      }
    }

    return images;
  }
}

export default ImagePickerService;

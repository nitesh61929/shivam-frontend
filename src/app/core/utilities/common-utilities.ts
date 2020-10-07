import { environment } from "@environments/environment";

export default class CommonUtilities {
  static gotoTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }

  static goToId(elementId: string) {
    document.getElementById(elementId).scrollIntoView();
  }

  static generateRandomString(characterCount: number) {
    return Math.random().toString(36).slice(-characterCount);
  }

  static toFormData<T>(formValue: T) {
    const formData = new FormData();

    for (const key of Object.keys(formValue)) {
      const value = formValue[key];
      if (value !== null) {
        formData.append(key, value);
      }
    }

    return formData;
  }

  static isEmpty(obj) {
    return Object.keys(obj).length === 0;
  }

  static getAddress(address: any) {
    if (this.isEmpty(address)) {
      return null;
    }
    const mapAddress = {
      city: address.city || null,
      street: address.street || null,
      district: address.district || null,
      state: address.state || null,
    };
    return Object.values(mapAddress).join(", ");
  }

  static checkFileFormat(file: File) {
    if (file.type.indexOf("image") > -1) {
      return "image";
    } else if (file.type.indexOf("video") > -1) {
      return "video";
    } else if (file.type.indexOf("pdf") > -1) {
      return "pdf";
    }
  }

  static formatSizeUnits(bytes) {
    if (bytes >= 1073741824) {
      bytes = (bytes / 1073741824).toFixed(2) + " GB";
    } else if (bytes >= 1048576) {
      bytes = (bytes / 1048576).toFixed(2) + " MB";
    } else if (bytes >= 1024) {
      bytes = (bytes / 1024).toFixed(2) + " KB";
    } else if (bytes > 1) {
      bytes = bytes + " bytes";
    } else if (bytes === 1) {
      bytes = bytes + " byte";
    } else {
      bytes = "0 byte";
    }
    return bytes;
  }

  static getFileSize(fileExtension: string) {
    if (fileExtension) {
      return environment.fileSizeValidations[fileExtension];
    }
  }
}

const NodeGeocoder = require('node-geocoder');
import { JwtService } from '@nestjs/jwt';
import { Location } from '../restaurants/schemas/restaurant.schema';
import { S3 } from 'aws-sdk';

export default class APIFeatures {
  static async getAddressLocation(address: string) {
    try {
      const options = {
        provider: process.env.GEOCODER_PROVIDER,
        apiKey: process.env.GEOCODER_API_KEY,
        httpAdapter: 'https',
        formatter: null,
      };

      const geoCoder = NodeGeocoder(options);
      const loc = await geoCoder.geocode(address);
      const location: Location = {
        type: 'Point',
        coordinates: [loc[0].longitude, loc[0].latitude],
        formattedAddress: loc[0].formattedAddress,
        city: loc[0].city,
        state: loc[0].stateCode,
        zipcode: loc[0].zipcode,
        country: loc[0].countryCode,
      };

      return location;
    } catch (error) {
      console.error(error.message);
    }
  }

  static async uploadFiles(files) {
    return new Promise((resolve, reject) => {
      const s3 = new S3({
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      });

      const images = [];

      files.forEach(async (file) => {
        const splitFile = file.originalname.split('.');
        const now = new Date();
        const fileName = `${splitFile[0]}-${now.getTime()}.${splitFile[1]}`;

        const params = {
          Bucket: `${process.env.AWS_BUCKET_NAME}/restaurants`,
          Key: fileName,
          Body: file.buffer,
        };

        const uploadResponse = await s3.upload(params).promise();
        if (!uploadResponse) {
          reject(false);
        }
        images.push(uploadResponse);

        if (images.length === files.length) {
          resolve(images);
        }
      });
    });
  }

  static async deleteFiles(files) {
    const s3 = new S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    });

    const imageKeys = files.map((file) => {
      return { Key: file.key };
    });

    const params = {
      Bucket: `${process.env.AWS_BUCKET_NAME}`,
      Delete: {
        Objects: imageKeys,
        Quiet: false,
      },
    };

    return new Promise((resolve, reject) => {
      s3.deleteObjects(params, function (err) {
        if (err) {
          console.log(err.message);
          reject(false);
        } else {
          resolve(true);
        }
      });
    });
  }

  static async getUserToken(
    userId: string,
    jwtService: JwtService,
  ): Promise<{ token: string }> {
    const payload = { id: userId };
    const token = await jwtService.sign(payload);
    return { token: token };
  }
}

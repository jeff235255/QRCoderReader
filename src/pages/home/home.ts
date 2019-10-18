import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

declare var qrcode;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  public qrCodeData: string = '';

  constructor(public navCtrl: NavController) {

  }

  public openQRCamera(event) {
    let self = this;
    var reader = new FileReader();

    reader.onload = function(res) {
      qrcode.callback = function(res) {
        if(res instanceof Error) {
          alert("Invalid QR CODE");
        } else {
          self.decodeFromQRCode(res);
        }

      };
      qrcode.decode(reader.result);
    };

    reader.readAsDataURL(event.target.files[0]);
  }

  decodeFromQRCode(qrContent) {
    let self = this;

    const NodeRSA = require('node-rsa');
    let privateKeyForQRCodeDecryption = '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';

    let key = new NodeRSA (privateKeyForQRCodeDecryption, 'pkcs8-private', {
      encryptionScheme: {
        scheme:'pkcs1_oaep'
      }
    });

    // try to decrypt QR content
    try {
      const decryptedFromQRCode = key.decrypt(qrContent, 'utf8')

      self.qrCodeData = JSON.stringify(JSON.parse(`${decryptedFromQRCode}`));

    } catch(e) {
      self.qrCodeData = qrContent
    }
  }

}

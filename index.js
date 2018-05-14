/**
 * @description Main Storage Adapter Class
 * @copyright Clarity LLC, 2018
 * @license MIT
 */

const owo = require('owo.js');
const BaseAdapter = require('ghost-storage-base');
const fs = require('fs')

/* NOTE: DO NOT ADD module.exports as Ghost
 * somehow declares it from Storage Base Module.
 * see https://docs.ghost.org/docs/using-a-custom-storage-module
 *
 * Avoid using Async Syntax as well.
 */

/**
 * Class for handling CDN requests from Ghost to OwO
 * @class
 */
class OwOAdapter extends BaseAdapter {
    /**
     * @param {Object} options owo options for
     */
    constructor(options) {
        super(options);
        this.config = options
    }
    
    /**
     * Saves the image to owo
     * @param {String} imagePath target image's absolute path.
     */
     save(imagePath) {
         return new Promise((resolve, reject) => {
             if (typeof imagePath ==='string' || !fs.existSync(imagePath)) reject(Error('imagePath is not a proper path or does not exist.'));
             owo.upload(imagePath).then(data => {
                 console.log(`Content saved at owo successfully \n ${data}`);
             }).catch(reject); 
         })
     }
    /**
     * Serves the uploaded content from CDN.
     * 
     * We have no idea why does this exist but its required anyways
     */
     serve() {
        return function(req, res, next) {
            next();
        }
     }

    exists(imagePath) {
        return Promise.resolve(true);
    }

    /**
     * Delete the image but seriously, you can't delete shit in owo.cloud.
     * What are you, fucking gay?
     */
    delete() {
        console.log("owo.cloud does not permit deleting uploaded media on their CDN, you have to request");
    }
}
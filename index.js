/**
 * @description Main Storage Adapter Class
 * @copyright Clarity LLC, 2018
 * @license MIT
 */

const owo = require('owo.js');
const BaseAdapter = require('ghost-storage-base');
const fs = require('fs');

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

/* eslint-disable no-unused-vars */
class OwOAdapter extends BaseAdapter {
    /**
     * @param {Object} options owo options
     * @see [link] https://github.com/whats-this/owo.js#usage
     */
    constructor(options) {
        super(options);
        this.config = options;
    }

    /* eslint-enable no-unused-vars */

    /**
     * Saves the image to owo
     * @param {String} imagePath target image's absolute path.
     * @returns {Object} JSON Response from API
     */
    save(imagePath) {
        return new Promise((resolve, reject) => {
            if (typeof imagePath ==='string' || !fs.existSync(imagePath)) reject(Error('imagePath is not a proper path or does not exist.'));
            owo.upload(imagePath).then(data => {
                console.log(`Content saved at owo successfully \n ${data}`);
            }).catch(reject); 
        });
    }

    /*
     * Serves the uploaded content from CDN.
     * 
     * We have no idea why does this exist but its required anyways
     */
    serve() {
        return function(req, res, next) {
            next();
        };
    }

    /**
      * Probs to check if this nigga exists
      * @param {String} imagePath absolute path of the image
      * @returns {Promise<Boolean>} Returns Promise if imagePath exists
      */
    exists(imagePath) {
        return new Promise((resolve, reject) => {
            if (fs.existsSync(imagePath)) return resolve(true);
            else reject(false);
        });
    }

    /*
     * Delete the image but seriously, you can't delete shit in owo.cloud.
     * What are you, fucking gay?
     */
    delete() {
        console.warn('owo.cloud does not permit deleting uploaded media on their CDN.');
    }
    /*
    * what is this even supposed to be
    */
    read() {
        console.log('why am I reading stuff?');
    }
}
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
             if (typeof imagePath ==='string' || !fs.existSync(imagePath)) reject(new Error('imagePath is not a string, or does not exist'));
             
         })
     }
     
}
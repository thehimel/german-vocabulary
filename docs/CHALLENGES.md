# Challenges

* How we can link similar words from different languages was the biggest challenge in terms of database design. However,
with the concept of bundle it was solved that was developed by our core developer.
* When we were uploading images to Cloudinary, it was adding some suffix to it. Later we found that there is an upload
settings in the Cloudinary UI that has to be adjusted to keep the original name of the file.
* During the creation of text-to-speech API, we were saving file directly to the file system and after response we were
instantly deleting the file. In local environment it was working seamlessly. However, when we deployed our Django
application to Vercel, we encountered issues related to file storage. Later we got to know Vercel, being a serverless
platform, may have restrictions on file operations. To address this issue, we should use an alternative storage
mechanism i.e. a temporary in-memory storage, instead of saving the file directly to the file system. We achieved this
by using BytesIO from the io module.

## Optimizations

* MAR 2024: Optimized API response time by `70.92%`
  * API call for getting the whole list of words were taking time in average approximately = `2.08s`
    * Dataset (in seconds) = [2.39, 2.27, 2.04, 2.28, 2.04, 2.13, 1.70, 1.79, 2.14, 2.06]
  * Removed non-required fields (notes, linked_words, translations) from serializer. These fields have many=True.
  * In addition, removed language from order_by element.
  * Average API response time after optimization approximately = `604.3 ms`
    * Dataset (in milliseconds) = `[631, 579, 553, 560, 545, 608, 664, 640, 618, 645]`
  * Percentage Improvements = `((Initial Time - Current Time) / Initial Time) x 100% = ((2.08 − 0.6043) / 2.08) x 100%`
  * Percentage Improvement ≈ `70.92%`
* MAR 2024: Optimized build size by `63.39%` and optimized deployment time by `43.64%`
  * Optimization of build size:
    * Vercel has build size of `250 MB`.
    * After integrating react, the build size exceeded this limit.
    * Removed `fontawesome` from `requirements.txt` and installed it through CDN.
    * Introduced `rm -rf node_modules` in the build script to remove the `node_modules` after completion of build.
    * Before: Total = `325.6 MB` | Size of Python modules = `178.7 MB` and size of node_modules = `146.9 MB`.
    * After: Total = `119.2 MB` | Size of Python modules = `119.2 MB` and size of node_modules = `0 MB`.
    * Optimization percentage ≈ `((325.6 - 119.2) / 325.6) x 100% = 63.39%`
  * Optimization of deployment time:
    * Before Average ≈ `131.9s` | Dataset (in seconds) = `[125, 145, 134, 120, 126, 127, 130, 129, 138, 145]`
    * After Average ≈ `74.4s` | Dataset (in seconds) = `[73, 75, 68, 71, 78, 72, 81, 77, 73, 76]`
    * Percentage Improvement = `((Initial Time - Current Time) / Initial Time) x 100% = ((131.9 - 74.4) / 131.9) x 100%`
    * Performance optimization percentage ≈ `43.64%`

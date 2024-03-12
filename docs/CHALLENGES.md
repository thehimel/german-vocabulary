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

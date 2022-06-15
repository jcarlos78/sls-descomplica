const Axios = require('axios').default;
const Fs = require('fs')  
const Path = require('path') 

const URLTranscription = 'https://zxeypja7xl.execute-api.us-east-1.amazonaws.com/dev';
const URLTranscription2 = 'https://olf34ehr26.execute-api.us-east-1.amazonaws.com/dev';

const VideosService = {
  async downloadSRT(idreview) {
    const url = await this._getDownloadSRTSignedURL(idreview);
    const res = await Axios.get(url);
    console.log(res.data);
  },
  async uploadVideo(video, lang, producer) {
    const res = await this._getUploadURLSignedURL(video.name, lang, producer);
    if (res.status === 200) {
      await Axios.put(res.data.presigned_url, video, {
        headers: {
          'Content-Type': video.type
        }
      });
    }
    return res;
  },
  async _getDownloadSRTSignedURL(idreview) {
    try {
      return await Axios.get(`${URLTranscription2}/review/last/srt/${idreview}`).then((res) => res.data);
    } catch (err) {
      console.error(err);
    }
    return null;
  },
  async _getUploadURLSignedURL(filename, lang, producerId) {
    try {
      if (lang) {
        return await Axios.get(`${URLTranscription}/getUploadURL/${lang}/${producerId}/${encodeURIComponent(filename)}`).then(
          (res) => res
        );
      }
    } catch (error) {
      if (error.response.status === 409) {
        return {
          status: 409,
          message: 'File already exists'
        };
      }
    }
    return null;
  }
};

export default VideosService;

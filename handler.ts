'use strict';

import 'source-map-support/register'
import TranscriptionModel from './model/TranscriptionModel';
import VideosService from './service/VideosService';


module.exports.run = async () => {
  
  const reviewed:any = await TranscriptionModel.getReviewed();

  await reviewed.map(async (item) => {
    await VideosService.downloadSRT(item.idtranscription);
  });

  console.log('Hello World');
};
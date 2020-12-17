import { saveAs } from 'file-saver';

export function formatBytes(bytes: number, decimals = 2): string {
  if (bytes === 0) {
    return '0 Bytes';
  }

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  const size = parseFloat( (bytes / Math.pow(k, i)).toFixed(dm) );
  const label = sizes[i];

  return  `${size} ${label}`;
}

export function buildSubmitData(formData) {
  const timeInfo = formData.action === 'trim' 
    ? { startTime: formData.startTime, endTime: formData.endTime } 
    : { chunkSize: formData.startTime };

  return {
    files: formData.files,
    action: formData.action,
    ...timeInfo
  };
}

export function validateSubmitData(data) {
  const errors = [];
  const endTime = Date.parse(`01/01/1111 ${data.endTime}`);
  const startTime = Date.parse(`01/01/1111 ${data.startTime}`);

  !data.files.length && errors.push('There is no files to process');
  data.action === 'slice' && !data.chunkSize && errors.push('You must define the chunk size');

  if (data.action === 'trim') {
    !endTime && errors.push('The end time cannot be zero');
    (endTime <= startTime) && errors.push('End time cannot be smaller or equal the start time');
  }

  return { valid: errors.length === 0, errors: new Set(errors) }
}

export function processFile({ file, data, processors }) {
  return new Promise((resolve, reject) => {
    const processorArgs = {
      files: [ file ],
      on: {
        done: resolve,
        error: reject
      }    
    };

    if (data.action === 'trim') {
      processors.trim(data.startTime, data.endTime, processorArgs);
    }
  
    if (data.action === 'slice') {
      processors.split(data.chunkSize, processorArgs);
    }
  });
}

export function download(name, blobUrl) {
  return saveAs(blobUrl, name);
}

export function truncate (limit: number, str: string) {
  return str.length > limit ? `${str.substr(0, limit)}...` : str;
}
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

  !data.files.length && errors.push('There is no files to proccess');
  data.action === 'slice' && !data.chunkSize && errors.push('You must define the chunk size');

  if (data.action === 'trim') {
    !endTime && errors.push('The end time cannot be zero');
    (endTime <= startTime) && errors.push('End time cannot be smaller or equal the start time');
  }

  return { valid: errors.length === 0, errors: new Set(errors) }
}

export function processData(data, processors, callbacks) {
  if (data.action === 'trim') {
    return processors.trim(data.startTime, data.endTime, {
      on: callbacks,
      files: data.files
    });
  }

  if (data.action === 'slice') {
    return processors.split(data.chunkSize, {
      on: callbacks,
      files: data.files
    });    
  }
}
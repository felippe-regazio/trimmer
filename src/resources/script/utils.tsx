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
  const time = [0, 1].map(i => {
    return ['hour12', 'minute', 'second']
      .map(unit => formData[unit][i] || '00').join(':');
  });

  return {
    files: formData.files,
    action: formData.action,
    startTime: time[0],
    endTime: time[1],
  };
}

export function validateSubmitData(data) {
  const timeToInt = time => time.split(':')
    .map(n => Number(n))
    .reduce((a, b) => a+b, 0);

  const errors = [];
  const endTimeInt = timeToInt(data.endTime);
  const startTimeInt = timeToInt(data.startTime);

  !data.files.length && errors.push('There is no files to proccess');
  data.action === 'slice' && !startTimeInt && errors.push('You must define the chunk size');

  if (data.action === 'trim') {
    !endTimeInt && errors.push('The end time cannot be zero');
    (endTimeInt <= startTimeInt) && errors.push('End time cannot be smaller or equal the start time');
  }

  return { valid: errors.length === 0, errors: new Set(errors) }
}

export function processData(data) {
  console.log(data);
}
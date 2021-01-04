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

export function buildSubmitData(formData: unknown): unknown {
  const timeInfo = formData.action === 'trim' 
    ? { startTime: formData.startTime, endTime: formData.endTime } 
    : { chunkSize: formData.startTime };

  return {
    files: formData.files,
    action: formData.action,
    ...timeInfo
  };
}

type ValidationResult = {
  valid: boolean,
  errors: array<string>
}

export function validateSubmitData(data: unknown): ValidationResult {
  const errors = [];
  const endTime = Date.parse(`01/01/1111 ${data.endTime}`);
  const startTime = Date.parse(`01/01/1111 ${data.startTime}`);

  !data.files.length && errors.push('submitErrorNoFilesToProcess');
  data.action === 'slice' && !data.chunkSize && errors.push('submitErrorDefineChunkSize');

  if (data.action === 'trim') {
    !endTime && errors.push('submitErrorNoZeroEndTime');
    (endTime <= startTime) && errors.push('submitErrorNoEndTimeOrEqualStart');
  }

  return { valid: errors.length === 0, errors: new Set(errors) }
}

type ProcessArgs = {
  file: File,
  data: unknown,
  processors: unknown
};

export function processFile({ file, data, processors }: ProcessArgs): Promise {
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

export function download(name: string, blobUrl: string): unknown {
  return saveAs(blobUrl, name);
}

export function truncate (limit: number, str: string): string {
  return str.length > limit ? `${str.substr(0, limit)}...` : str;
}

export function getDefaultLocale (): string {
  const fromStorage = window.localStorage.getItem('trimmerLocale');
  const fromNavigator = navigator && navigator.language;
  
  if (fromStorage) {
    return fromStorage;
  }
  
  if (fromNavigator) {
    const shortLangName = navigator.language.split('-')[0];
    
    return shortLangName.toLowerCase() === 'pt' ? 'pt-BR' : 'en';
  }
}
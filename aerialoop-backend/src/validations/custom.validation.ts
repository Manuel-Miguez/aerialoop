/**
 * Compare to all items in the file Array if the match with certain value in certain key
 * @param keyName name of the Key of the object file to compare
 * @param keyValues array of value allowed
 */
export const validArchivesArray = (keyName: string, keyValues: string[]) => (files: Express.Multer.File[], helpers: any) => {
  if (keyValues.length > files.length) {
    return helpers.message('Files Needed not found');
  }
  let isValid = true;
  keyValues.forEach((value) => {
    isValid = isValid && files.some((file: any) => (file[keyName] ? file[keyName] === value : false));
  });
  return isValid ? files : helpers.message('Files Needed not found');
};

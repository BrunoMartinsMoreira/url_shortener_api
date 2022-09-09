/* eslint-disable no-useless-escape */
const validateUrl = (url: string) => {
  return /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/.test(
    url,
  );
};
export { validateUrl };

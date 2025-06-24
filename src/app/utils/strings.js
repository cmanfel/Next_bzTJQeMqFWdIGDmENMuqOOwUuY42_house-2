import listingData from '../../data/listing.json';

export function convertToFileName(inputString) {
    // Convert the string to lowercase
    let fileName = inputString.toLowerCase();
  
    // Replace spaces and unsuitable characters with underscores
    // The regex [^a-z0-9] matches any character that is not a lowercase letter or digit
    fileName = fileName.replace(/[^a-z0-9]+/g, '_');
  
    // Trim any leading or trailing underscores
    fileName = fileName.replace(/^_+|_+$/g, '');
  
    return fileName;
}

export function getAppUrl() {
    const { uid, id: listingId } = listingData;
    return `https://app.hostrapp.com/reservation?uid=${uid}&listingId=${listingId}`;
}
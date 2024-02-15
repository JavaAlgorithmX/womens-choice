
const formatDate = (timestamp) => {
    const date = new Date(timestamp.seconds * 1000);
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true // Set to true to use 12-hour clock format
    };
    return date.toLocaleDateString('en-US', options);
};

export {formatDate}
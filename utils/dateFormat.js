// dataFormat.js

// Format the timestamp into a readable date format (e.g., "October 10, 2024, 3:30 PM")
const formatDate = (timestamp) => {
    const date = new Date(timestamp);
  
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: true,
    };
  
    return date.toLocaleString('en-US', options);
  };
  
  // Alternatively, you can return just the date without the time
  const formatShortDate = (timestamp) => {
    const date = new Date(timestamp);
    
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
  
    return date.toLocaleDateString('en-US', options);
  };
  
  // Exporting the utility functions
  module.exports = { formatDate, formatShortDate };
  
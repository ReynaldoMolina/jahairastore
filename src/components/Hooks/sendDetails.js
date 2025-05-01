async function sendDetails(originalList, newList, url, token) {
  const updates = [];
  const deletions = [];
  const creations = [];

  // Check modifications & deletions
  originalList.forEach(original => {
    const updated = newList.find(d => d.id === original.id);
    
    if (!updated) {
      // It was removed
      deletions.push(original.id);
    } else if (updated.quantity !== original.quantity) {
      // It was modified
      updates.push(updated);
    }
  });

  // Check new additions
  newList.forEach(detail => {
    if (!detail.id) {
      // No ID means it’s new
      creations.push(detail);
    }
  });

  // Send API Requests
  await Promise.all([
    ...updates.map(detail => fetch(`${url}${detail.id}`, {
      method: 'PATCH',
      body: JSON.stringify({ quantity: detail.quantity }),
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })),
    ...deletions.map(id => fetch(`${url}${id}`, { method: 'DELETE' })),
    ...creations.map(detail => fetch(url, {
      method: 'POST',
      body: JSON.stringify(detail),
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }))
  ]);
};

export { sendDetails };

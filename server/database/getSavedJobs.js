module.exports = (arr) => {
  const params = arr.map((id, index) => `$${index + 3}`);
  console.log(params);
  return (`
    SELECT external_id, status_code
    FROM jobpostings
    WHERE user_id = $1 AND portal = $2
    AND external_id
    IN (${params.join(',')});
  `);
};

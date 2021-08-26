INSERT INTO jobpostings AS j (
  user_id,
  portal,
  status_code,
  position,
  salary,
  location,
  employer,
  description,
  external_id
) VALUES (
  1,
  0,
  1,
  'Frontend Engineer',
  '127k',
  'SF',
  'Facebook',
  'This is a description',
  '929284854'
)
ON CONFLICT (user_id, external_id, portal)
DO UPDATE SET status_code = 5
RETURNING external_id, portal;
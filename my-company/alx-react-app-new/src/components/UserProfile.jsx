function UserProfile(props) {
  return (
    <div style={{ border: '1px solid gray', borderRadius: '10px', padding: '15px', margin: '15px', boxShadow: '2px 2px 8px lightgray' }}>
      <h2 style={{ color: 'blue', marginBottom: '10px' }}>{props.name}</h2>
      <p style={{ fontSize: '16px' }}>
        Age: <span style={{ fontWeight: 'bold' }}>{props.age}</span>
      </p>
      <p style={{ fontStyle: 'italic' }}>Bio: {props.bio}</p>
    </div>
  );
}

export default UserProfile;

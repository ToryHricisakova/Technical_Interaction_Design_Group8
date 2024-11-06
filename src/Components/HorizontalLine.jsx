const HorizontalLine = ({ width }) => {
    return ( 
        <hr style={{
            width: width, // adjust the width as needed
            border: "1px solid #E47347",
            marginTop: "10px",
            marginBottom: "10px",
        }} />
     );
}
 
export default HorizontalLine;
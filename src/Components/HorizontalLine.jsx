const HorizontalLine = ({ width }) => {
    return ( 
        <hr style={{
            width: width, // adjust the width as needed
            border: "1px solid #E47347",
            marginTop: "20px",
            marginBottom: "20px",
        }} />
     );
}
 
export default HorizontalLine;
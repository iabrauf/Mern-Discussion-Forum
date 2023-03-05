import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import success from "../images/success.png";
import styles from "./styles.module.css";
import { Fragment } from "react"

const EmailVerify = () => {
	const [validUrl, setValidUrl] = useState(true);
	const {id,token} = useParams();
		const verifyEmailUrl = (uid,emailtoken) => {
			console.log("testing");
			const idAndToken = {
				uid:uid,
				emailtoken:emailtoken,
			}
				axios.post("http://localhost:5000/verifyEmailToken",idAndToken).then(res =>{
					const resStatus = res.data.status;
					if(resStatus === 'ok'){
						setValidUrl(true);
					}
				})
		};
useEffect(() => {
		verifyEmailUrl(id,token);		
	});

	return (
		<Fragment>
			{validUrl ? (
				<div>
					<img src={success} alt="success_img"  />
					<h1>Email verified successfully</h1>
					<Link to="/sign-in">
						<button className={styles.green_btn}>Login</button>
					</Link>
				</div>
			) : (
				<h1>404 Not Found</h1>
			)}
		</Fragment>
	);
};

export default EmailVerify;
import { CognitoIdentityProviderClient, SignUpCommand, ResendConfirmationCodeCommand, ConfirmForgotPasswordCommand, VerifyUserAttributeCommand, InitiateAuthCommand, ConfirmSignUpCommand, ForgotPasswordCommand } from '@aws-sdk/client-cognito-identity-provider';
import 'dotenv/config';
import crypto from 'crypto';
import { jwtDecode } from 'jwt-decode';


function getSecretHash(username, clientId, clientSecret) {
    return crypto.createHmac('SHA256', clientSecret)
        .update(username + clientId)
        .digest('base64');
}

export async function signUp(req, res) {
    try {
        const { email, password } = req.body;
        const clientId = process.env.CLIENT_ID;

        const secret = getSecretHash(email, clientId, process.env.CLIENT_SECRET);

        const client = new CognitoIdentityProviderClient({ region: process.env.AWS_REGION });
        const command = new SignUpCommand({
            ClientId: clientId,
            Username: email,
            Password: password,
            UserAttributes: [
                {
                    Name: 'email',
                    Value: email,
                },
            ],
            SecretHash: secret,
        });
        console.log("Signing up user:", email);
        const response = await client.send(command);
        const token = response.UserSub;
        res.status(200).json({
            message: "sign up successful",
            item: token,
        });
    } catch (err) {
        if (err.name === "UsernameExistsException") {
            res.status(200).json({
                message: "An account with this email already exists. Please Log in",
                error: "UsernameExists",
                navigate: "/signin"
            })
            console.error("Sign up failed: Username already exists");
        }
        else {
            res.status(200).json({ error: err.name });
            console.error("Sign up failed:", err.message);
        }
    }
}

export async function login(req, res) {
    try {
        const { email, password } = req.body;
        const clientId = process.env.CLIENT_ID;
        const secret = getSecretHash(email, clientId, process.env.CLIENT_SECRET);
        const client = new CognitoIdentityProviderClient({ region: process.env.AWS_REGION });

        const command = new InitiateAuthCommand({
            AuthFlow: 'USER_PASSWORD_AUTH',
            ClientId: clientId,
            AuthParameters: {
                USERNAME: email,
                PASSWORD: password,
                SECRET_HASH: secret,
            },
        });
        const response = await client.send(command);
        const idToken = response.AuthenticationResult.IdToken;
        const token = jwtDecode(idToken);
        res.status(200).json({
            message: "Login successful",
            item: token.sub,
        });
        console.log("Login successful for user:", email);
    }
    catch (err) {
        if (err.name === "UserNotConfirmedException") {
            console.error("Login failed:", err.message);
            res.status(200).json({
                error: "UserNotConfirmed",
                message: "You haven't confirmed your email. Please confirm your account.",
                navigate: "/verify"
            });
        }
        else {
            console.error("Login failed:", err.message);
            res.status(401).json({ error: err.message });
        }
    }
}

export async function verifyEmail(req, res) {
    try {
        const { email, code } = req.body;
        const clientId = process.env.CLIENT_ID;
        const secret = getSecretHash(email, clientId, process.env.CLIENT_SECRET);
        const client = new CognitoIdentityProviderClient({ region: process.env.AWS_REGION });

        const command = new ConfirmSignUpCommand({
            ClientId: clientId,
            Username: email,
            ConfirmationCode: code,
            SecretHash: secret,
        });

        const response = await client.send(command);
        res.status(200).json({
            message: "Code verify successful",
            item: response.Session,
        });
    }
    catch (err) {
        console.error("Verification failed:", err.message);
        res.status(500).json({
            error: "Failed to verify",
            message: err.message
        });
    }
}

export async function resendConfirmationCode(req, res) {
    try {
        const { email } = req.body;
        const clientId = process.env.CLIENT_ID;
        const secret = getSecretHash(email, clientId, process.env.CLIENT_SECRET);
        const client = new CognitoIdentityProviderClient({ region: process.env.AWS_REGION });

        const command = new ResendConfirmationCodeCommand({
            ClientId: clientId,
            Username: email,
            SecretHash: secret,
        });

        const response = await client.send(command);

        res.status(200).json({
            message: "Confirmation code resent successfully",
            deliveryDetails: response.CodeDeliveryDetails,
        });
    } catch (err) {
        res.status(500).json({
            error: "Failed to resend confirmation code",
            message: err.message,
        });
        console.error(err.message);
    }
}

export const changePassword = async (req, res) => {
    try {
        const { uid, email } = req.body;
        const clientId = process.env.CLIENT_ID;
        const client = new CognitoIdentityProviderClient({ region: process.env.AWS_REGION });
        const secret = getSecretHash(email, clientId, process.env.CLIENT_SECRET);
        const command = new ForgotPasswordCommand({
            ClientId: clientId,
            Username: email,
            SecretHash: secret,
        });
        const response = await client.send(command);
        res.status(200).json({
            message: "Password reset initiated. Check your email for further instructions.",
        });
    }
    catch (err) {
        res.status(500).json({
            message: "Failed to initiate password reset",
        });
        console.log(err.message)
    }
}

export const confirmPasswordChange = async (req, res) => {
    try {
        const { uid, email, passwordCode, newPassword } = req.body;
        const clientId = process.env.CLIENT_ID;
        const clientSecret = process.env.CLIENT_SECRET;

        const client = new CognitoIdentityProviderClient({
            region: process.env.AWS_REGION,
        });

        const secret = getSecretHash(email, clientId, clientSecret);

        const command = new ConfirmForgotPasswordCommand({
            ClientId: clientId,
            Username: email,
            ConfirmationCode: passwordCode,
            Password: newPassword,
            SecretHash: secret,
        });

        const response = await client.send(command);
        res.status(200).json({
            message: "Password changed successfully",
        });
    }
    catch (err) {
        res.status(500).json({
            message: "Failed to change password",
        });
        console.log(err.message)
    }
}
import { CognitoIdentityProviderClient, SignUpCommand, ResendConfirmationCodeCommand, VerifyUserAttributeCommand, InitiateAuthCommand, ConfirmSignUpCommand } from '@aws-sdk/client-cognito-identity-provider';
import 'dotenv/config';
import crypto from 'crypto';

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

        res.status(200).json({
            message: "sign up successful",
            item: response,
        });
    } catch (err) {
        res.status(200).json({ error: err });
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
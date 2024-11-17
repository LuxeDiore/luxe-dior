import React from "react";
import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";
import { LogoServer as Logo } from "@/components/LogoServer";

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "";
export const OrderStatusUpdate = async ({
  orderItems,
  name,
  paymentId,
  orderValue,
  deliveryCharge,
  newStatus,
}: {
  orderItems: any[];
  name: string;
  paymentId: string;
  orderValue: string;
  deliveryCharge: string;
  newStatus: string;
}) => {
  const previewText = `Order status updated for ${paymentId}`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>

      <Body style={main}>
        <Container style={container}>
          <Section>
            <Logo />
          </Section>

          <Section style={{ paddingBottom: "20px" }}>
            <Row>
              <Text style={heading}>Order Status Updated </Text>
              <Text>Order Id : {paymentId}</Text>
              <Text>Current Status : {newStatus}</Text>
            </Row>
          </Section>
          <Section
            style={{
              paddingBottom: "20px",
              display: "flex",
              flexDirection: "column",
              gap: "2rem",
            }}
          >
            <Row>
              <Text style={subHeading}>Order Items</Text>
            </Row>
            {orderItems?.map((item, key) => {
              const variantId = item.variantId!;
              const variantName = `${item.productId.title}`;
              const itemQuantity = item.quantity;
              const basePrice = item.basePrice;
              const image = item.productId.variants[variantId].images[0];
              return (
                <div
                  key={key}
                  style={{
                    display: "flex",
                    gap: "2rem",
                    width: "580px",
                    height: "7rem",
                    justifyContent: "space-between"!,
                    alignItems: "center",
                  }}
                >
                  <img
                    src={image}
                    style={{
                      borderRadius: "10px",
                      height: "4rem",
                      width: "4rem",
                    }}
                  />
                  <p
                    style={{
                      paddingLeft: "3rem",
                    }}
                  >
                    {variantName}
                  </p>
                  <p
                    style={{
                      paddingLeft: "3rem",
                    }}
                  >
                    x {itemQuantity} pcs
                  </p>
                  <p
                    style={{
                      paddingLeft: "3rem",
                    }}
                  >
                    ₹{basePrice}
                  </p>
                </div>
              );
            })}
            <Row>
              <h3>Delivery Charges : ₹{deliveryCharge}</h3>
              <h2>Total : {orderValue}</h2>
            </Row>
          </Section>
          <Hr style={hr} />
          <Section>
            <Row>
              <Text style={footer}>
                <div className="flex flex-col gap-2 items-center">
                  <div>
                    <Logo />
                  </div>
                  <div className="flex gap-2 font-semibold">
                    &copy; 2024, All rights reserved
                  </div>
                  <br />
                  <div className="flex gap-2 font-semibold text-gray-600">
                    <b>Note : </b> This is a system generated email. Please do
                    not respond to it.
                  </div>
                </div>
              </Text>
            </Row>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

// export default ContactUsEmailTemplate;

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
  width: "580px",
  maxWidth: "100%",
};

const userImage = {
  margin: "0 auto",
  marginBottom: "16px",
  borderRadius: "50%",
};

const heading = {
  fontSize: "32px",
  lineHeight: "1.3",
  fontWeight: "700",
  color: "#484848",
};
const subHeading = {
  fontSize: "25px",
  lineHeight: "1.3",
  fontWeight: "700",
  color: "#484848",
};

const paragraph = {
  fontSize: "18px",
  lineHeight: "1.4",
  color: "#484848",
};

const review = {
  ...paragraph,
  padding: "24px",
  backgroundColor: "#f2f3f3",
  borderRadius: "4px",
};

const button = {
  backgroundColor: "#ff5a5f",
  borderRadius: "3px",
  color: "#fff",
  fontSize: "18px",
  paddingTop: "19px",
  paddingBottom: "19px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  width: "100%",
};

const link = {
  ...paragraph,
  color: "#ff5a5f",
  display: "block",
};

const reportLink = {
  fontSize: "14px",
  color: "#9ca299",
  textDecoration: "underline",
};

const hr = {
  borderColor: "#cccccc",
  margin: "20px 0",
};

const footer = {
  color: "#9ca299",
  fontSize: "14px",
  marginBottom: "10px",
};

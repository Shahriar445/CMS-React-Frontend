import React, { useEffect, useState } from "react";
import {
  Form,
  Select,
  Input,
  Button,
  DatePicker,
  Badge,
  Row,
  Col,
  Card,
} from "antd";
import moment from "moment";
import { Modal } from "antd";

import {
  InfoCircleOutlined,
  DollarOutlined,
  TagOutlined,
} from "@ant-design/icons";

const { Option } = Select;

const DeclarationFormExporter: React.FC = () => {
  const [form] = Form.useForm();

  const [categories, setCategories] = useState<
    {
      category: string;
      maxWeight: number;
      weightUnit: string;
      maxQuantity: number;
    }[]
  >([]);
  const [products, setProducts] = useState<
    { priceId: number; productName: string; price: number }[]
  >([]);
  const [selectedCategory, setSelectedCategory] = useState<
    | {
        category: string;
        maxWeight: number;
        weightUnit: string;
        maxQuantity: number;
      }
    | undefined
  >(undefined);
  const [selectedProduct, setSelectedProduct] = useState<
    { priceId: number; productName: string; price: number } | undefined
  >(undefined);
  const [countries, setCountries] = useState<string[]>([]);
  const [ports, setPorts] = useState<
    { port: string; vat: number; tax: number }[]
  >([]);
  const [selectedCountry, setSelectedCountry] = useState<string | undefined>(
    undefined
  );
  const [totalPrice, setTotalPrice] = useState(0);
  const [vat, setVat] = useState(0);
  const [tax, setTax] = useState(0);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "https://localhost:7232/product-categories"
        );
        const data = await response.json();
        const categoryData = data.map((item) => ({
          category: item.category,
          maxWeight: item.maxWeight,
          weightUnit: item.weightUnit,
          maxQuantity: item.maxQuantity,
        }));
        setCategories(categoryData);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProductsByCategory = async (category: string) => {
      try {
        const response = await fetch(
          `https://localhost:7232/api/CMS/GetProductsByCategory?category=${category}`
        );
        const data = await response.json();
        setProducts(
          data.map((product) => ({
            priceId: product.priceId,
            productName: product.productName,
            price: product.price,
            maxWeight: product.maxWeight,
            maxQuantity: product.maxQuantity,
            weightUnit: product.weightUnit,
          }))
        );
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    if (selectedCategory) {
      fetchProductsByCategory(selectedCategory.category);
    } else {
      setProducts([]);
    }
  }, [selectedCategory]);

  useEffect(() => {
    const fetchCountries = async () => {
      const response = await fetch("https://localhost:7232/Getcountries");
      const data = await response.json();
      setCountries(data);
    };

    fetchCountries();
  }, []);

  useEffect(() => {
    const fetchPorts = async () => {
      if (selectedCountry) {
        const response = await fetch(
          `https://localhost:7232/country/${selectedCountry}`
        );
        const data = await response.json();
        setPorts(data);
      } else {
        setPorts([]);
      }
    };

    fetchPorts();
  }, [selectedCountry]);
  const handleCategoryChange = (value: string) => {
    const category = categories.find((cat) => cat.category === value);
    setSelectedCategory(category);
  };

  const handleCountryChange = (value: string) => {
    setSelectedCountry(value);
  };

  const handleProductChange = (value: string) => {
    const product = products.find((product) => product.productName === value);
    setSelectedProduct(product);
    if (product) {
      form.setFieldsValue({
        productPrice: product.price,
        productsQuantity: 1, // Set initial quantity to 1 when product is selected
      });
      calculateTotalPrice(1, product.price); // Calculate total price with quantity 1
    } else {
      form.setFieldsValue({
        productPrice: 0,
        productsQuantity: 0, // Reset quantity if no product is found
      });
    }
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const quantity = Number(e.target.value);
    if (!isNaN(quantity) && quantity > 0) {
      form.setFieldsValue({ productsQuantity: quantity }); // Save user input quantity in the form
      calculateTotalPrice(quantity, selectedProduct?.price); // Calculate total price with user-defined quantity
    }
    console.log("quantity", quantity, selectedProduct?.price);
  };

  const handlePortChange = () => {
    const selectedDestinationPort = form.getFieldValue("destinationPort");
    const selectedPortDetails = ports.find(
      (port) => port.port === selectedDestinationPort
    );
    console.log(
      "seleted port ",
      selectedPortDetails?.vat,
      selectedPortDetails?.tax
    );
    if (selectedPortDetails) {
      setVat(selectedPortDetails.vat);
      setTax(selectedPortDetails.tax);
      calculateTotalPrice(
        Number(form.getFieldValue("productsQuantity")), // Use the quantity from the form
        selectedProduct?.price,
        selectedPortDetails.vat,
        selectedPortDetails.tax
      );
      console.log("portchange", form.getFieldValue("productsQuantity")); // Log the quantity
    }
  };

  const calculateTotalPrice = (
    quantity: number,
    productPrice?: number,
    vatRate?: number,
    taxRate?: number
  ) => {
    // Ensure quantity is a valid number before proceeding
    const validQuantity = Number(quantity);

    console.log("Calculating total price with:", {
      productPrice,
      quantity: validQuantity,
      vatRate,
      taxRate,
    });

    // Check if productPrice and validQuantity are valid before calculating
    if (!isNaN(validQuantity) && validQuantity > 0 && productPrice) {
      const subtotal = productPrice * validQuantity;
      const vatAmount = vatRate ? (subtotal * vatRate) / 100 : 0;
      const taxAmount = taxRate ? (subtotal * taxRate) / 100 : 0;
      const total = subtotal + vatAmount + taxAmount;

      console.log("Total calculated:", total);

      setTotalPrice(total);
      form.setFieldsValue({
        totalPrice: total.toFixed(2),
        vat: vatAmount.toFixed(2),
        tax: taxAmount.toFixed(2),
      });
    } else {
      console.log("Invalid quantity or product price");

      setTotalPrice(0);
      form.setFieldsValue({
        totalPrice: "0.00",
        vat: "0.00",
        tax: "0.00",
      });
    }
  };
  const handleWeightChange = (weightValue: string) => {
    const weight = Number(weightValue);
    if (!isNaN(weight) && weight > 0) {
      // You can add any logic you need based on the weight here
      console.log("Weight entered:", weight);
    }
  };

  const onFinish = async (values: any) => {
    console.log("Form submitted with values:", values);
    const userId = localStorage.getItem("userId");

    const dataToSend = {
      userId: userId ? parseInt(userId) : 0,
      declarationDate: new Date().toISOString(),
      status: "Pending",
      products: [
        {
          declarationId: 0,
          productName: values.productsName,
          quantity: values.productsQuantity,
          weight: values.maxWeight,
          countryOfOrigin: values.countryOrigin,
          hscode: values.hscode,
          category: values.productsCategory,
          totalPrice: values.productPrice,
        },
      ],
      shipments: [
        {
          methodOfShipment: values.shipmentMethod,
          portOfDeparture: values.departurePort,
          portOfDestination: values.destinationPort,
          departureDate: new Date().toISOString(),
          arrivalDate: new Date().toISOString(),
        },
      ],
    };

    try {
      const response = await fetch(
        "https://localhost:7232/CreateDeclarationExporter",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataToSend),
        }
      );
      const responseText = await response.text();

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // Show success message in Ant Design Modal
      Modal.success({
        content: responseText, // Display the success message returned from the server
        onOk() {
          form.resetFields();

          // Optional: Do something when the modal is closed, like resetting the form
        },
      });

      console.log("Response from server:", responseText);
    } catch (error) {
      console.error("Error submitting form:", error);
      // Handle error (e.g., display an error message)
      Modal.error({
        content: "Error submitting the form. Please try again.",
      });
    }
  };

  return (
    <Card title="Declaration Form" style={{ marginTop: "5px" }}>
      <main className="form-container p-6 bg-white shadow-md rounded-lg">
        <div className="form-section">
          <Form form={form} onFinish={onFinish} id="customs-form">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Form.Item
                  label="Category of products:"
                  name="productsCategory"
                  rules={[
                    { required: true, message: "Please select a category!" },
                  ]}
                >
                  <Select
                    value={
                      selectedCategory ? selectedCategory.category : undefined
                    } // Extract string value for Select
                    placeholder="Select category"
                    style={{ height: 28 }}
                    onChange={handleCategoryChange}
                  >
                    {categories.map((cat) => (
                      <Option key={cat.category} value={cat.category}>
                        {cat.category}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>
              <div>
                <Form.Item
                  label="Product Name:"
                  name="productsName"
                  rules={[
                    { required: true, message: "Please select a product!" },
                  ]}
                >
                  <Select
                    placeholder="Select product"
                    style={{ height: 28 }}
                    onChange={handleProductChange}
                  >
                    {products.map((product) => (
                      <Option key={product.priceId} value={product.productName}>
                        {product.productName} - ${product.price}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>

              <div>
                <Form.Item
                  label="Quantity:"
                  name="productsQuantity"
                  rules={[
                    { required: true, message: "Please enter the quantity!" },
                    {
                      validator: (_, value) => {
                        const quantity = Number(value);
                        const maxQuantity = selectedCategory?.maxQuantity;

                        if (!value || isNaN(quantity) || quantity <= 0) {
                          return Promise.reject(
                            new Error("Please enter a valid quantity!")
                          );
                        }

                        if (maxQuantity && quantity > maxQuantity) {
                          return Promise.reject(
                            new Error(`Quantity cannot exceed ${maxQuantity}.`)
                          );
                        }

                        return Promise.resolve();
                      },
                    },
                  ]}
                >
                  <Input
                    onChange={handleQuantityChange}
                    type="number"
                    style={{ height: 28 }}
                    prefix={<TagOutlined />}
                    min={1} // Ensures the minimum value is 1
                    max={selectedCategory?.maxQuantity} // Sets the maximum value based on selectedCategory
                  />
                  {selectedCategory && (
                    <Badge
                      count={`Max: ${selectedCategory.maxQuantity}`}
                      style={{ backgroundColor: "#52c41a", marginLeft: 8 }}
                    />
                  )}
                </Form.Item>
              </div>
              <div>
                <Form.Item
                  label="Weight:"
                  name="weight"
                  rules={[
                    { required: true, message: "Please enter the weight!" },
                    {
                      validator: (_, value) => {
                        const weight = Number(value);
                        const maxWeight = selectedCategory?.maxWeight;

                        if (isNaN(weight) || weight <= 0) {
                          return Promise.reject(
                            new Error("Please enter a valid Weight!")
                          );
                        }

                        if (maxWeight && weight > maxWeight) {
                          return Promise.reject(
                            new Error(`Quantity cannot exceed ${maxWeight}.`)
                          );
                        }

                        return Promise.resolve();
                      },
                    },
                  ]}
                >
                  <Input
                    type="number"
                    style={{ height: 28 }}
                    prefix={<TagOutlined />}
                    min={1}
                    max={selectedCategory?.maxWeight}
                    onChange={(e) => {
                      const weightValue = e.target.value;
                      form.setFieldsValue({ weight: weightValue }); // Set the value in form state
                      handleWeightChange(weightValue); // Call a function to handle weight change (if needed)
                    }}
                  />
                  {selectedCategory && (
                    <Badge
                      count={`Max: ${selectedCategory.maxWeight} ${selectedCategory.weightUnit}`}
                      style={{ backgroundColor: "#52c41a", marginLeft: 8 }}
                    />
                  )}
                </Form.Item>
              </div>
              <div>
                <Form.Item label="Price:" name="productPrice">
                  <Input
                    value={selectedProduct?.price || 0}
                    readOnly
                    style={{ height: 28 }}
                    prefix={<DollarOutlined />}
                    className="w-full h-10 rounded-md border-gray-300"
                  />
                </Form.Item>
              </div>

              <div>
                <Form.Item
                  label="Shipment Method:"
                  name="shipmentMethod"
                  rules={[
                    {
                      required: true,
                      message: "Please select a shipment method!",
                    },
                  ]}
                >
                  <Select style={{ height: 28 }}>
                    <Option value="air">Air</Option>
                    <Option value="sea">Sea</Option>
                    <Option value="land">Land</Option>
                  </Select>
                </Form.Item>
              </div>

              <div>
                <Form.Item
                  label="Country of Origin:"
                  name="countryOrigin"
                  rules={[
                    { required: true, message: "Please select a country!" },
                  ]}
                >
                  <Select
                    placeholder="Select country"
                    style={{ height: 28 }}
                    onChange={handleCountryChange}
                  >
                    {countries.map((country) => (
                      <Option key={country} value={country}>
                        {country}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>
              <div>
                <Form.Item
                  label="Port of Departure:"
                  name="departurePort"
                  rules={[{ required: true, message: "Please select a port!" }]}
                >
                  <Select placeholder="Select port" style={{ height: 28 }}>
                    {ports.map((port) => (
                      <Option key={port.port} value={port.port}>
                        {port.port}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>
              <div>
                <Form.Item
                  label="Port of Destination:"
                  name="destinationPort"
                  rules={[{ required: true, message: "Please select a port!" }]}
                >
                  <Select
                    placeholder="Select port"
                    style={{ height: 28 }}
                    onChange={handlePortChange}
                  >
                    {ports.map((port) => (
                      <Option key={port.port} value={port.port}>
                        {port.port} (VAT: {port.vat}%, Tax: {port.tax}%)
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>

              <div>
                <Form.Item
                  label="Expected Departure Date:"
                  name="expectedDeparture"
                  rules={[
                    {
                      required: true,
                      message: "Please select a departure date!",
                    },
                    {
                      validator: (_, value) => {
                        if (!value) {
                          return Promise.resolve();
                        }
                        const today = moment().startOf("day");
                        if (value.isBefore(today)) {
                          return Promise.reject(
                            new Error("Departure date cannot be in the past!")
                          );
                        }
                        return Promise.resolve();
                      },
                    },
                  ]}
                >
                  <DatePicker
                    style={{ height: 28, width: "100%" }}
                    onChange={(date) =>
                      form.setFieldsValue({ expectedDeparture: date })
                    }
                  />
                </Form.Item>
              </div>
              <div>
                <Form.Item
                  label="Expected Arrival Date:"
                  name="expectedArrival"
                  dependencies={["expectedDeparture"]}
                  rules={[
                    {
                      required: true,
                      message: "Please select an arrival date!",
                    },
                    {
                      validator: (_, value) => {
                        const departureDate =
                          form.getFieldValue("expectedDeparture");
                        if (!value || !departureDate) {
                          return Promise.resolve();
                        }
                        const today = moment().startOf("day");
                        if (value.isBefore(today)) {
                          return Promise.reject(
                            new Error("Arrival date cannot be in the past!")
                          );
                        }
                        if (value.isBefore(departureDate)) {
                          return Promise.reject(
                            new Error(
                              "Arrival date cannot be earlier than departure date!"
                            )
                          );
                        }
                        return Promise.resolve();
                      },
                    },
                  ]}
                >
                  <DatePicker
                    style={{ height: 28, width: "100%" }}
                    onChange={(date) =>
                      form.setFieldsValue({ expectedArrival: date })
                    }
                  />
                </Form.Item>
              </div>
              <div>
                <Form.Item label="Total Price:" name="totalPrice">
                  <Input
                    value={totalPrice ? totalPrice.toFixed(2) : 0}
                    readOnly
                    style={{ height: 28 }}
                    prefix={<DollarOutlined />}
                  />
                </Form.Item>
              </div>

              <fieldset>
                <legend>Price Details</legend>
                <div>
                  <Form.Item label="VAT:" name="vat">
                    <Input
                      value={form.getFieldValue("vat")}
                      readOnly
                      style={{ height: 28 }}
                      prefix={<DollarOutlined />}
                    />
                  </Form.Item>
                </div>
                <div>
                  <Form.Item label="Tax:" name="tax">
                    <Input
                      value={form.getFieldValue("tax")}
                      readOnly
                      style={{ height: 28 }}
                      prefix={<DollarOutlined />}
                    />
                  </Form.Item>
                </div>
              </fieldset>
            </div>
            <div className="mt-6">
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg"
                >
                  Submit Declaration
                </Button>
              </Form.Item>
            </div>
          </Form>
        </div>
      </main>
    </Card>
  );
};

export default DeclarationFormExporter;

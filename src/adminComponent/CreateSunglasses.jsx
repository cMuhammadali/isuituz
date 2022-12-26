import React, { useState } from "react";
import "../styles/sunglasses.css";
import { Image } from "antd";
import { Button, Modal } from "antd";
import { message } from "antd";
import {DeleteOutlined, LeftOutlined} from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import { useSunglasses } from "../contexts/sunglasses";

function CreateSunglasses() {
  const [messageApi, contextHolder] = message.useMessage();
  // hooks
  const [sunglasses, setSunglasses] = useSunglasses();

  //state
  const [img, setImg] = useState("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState(0);
  const [sizes, setSizes] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const navigate = useNavigate();

  const info = () => {
    messageApi.info("Compelete the list!");
  };

  const error = () => {
    messageApi.open({
      type: 'error',
      content: 'Deleted',
    });
  };

  //handleProduct
  const handleProduct = (e) => {
    e.preventDefault();
    try {
      if (img && title && desc && price && sizes) {
        setIsModalOpen(false);
        let arr = [...sunglasses, { img, title, desc, price, sizes }];
        setSunglasses(arr);
      } else {
        info();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const removeCreates = (id) => {
    let newMass = sunglasses.filter(s=>s.id !== id)
    setSunglasses(newMass)
  };

  return (
    <div className="container">
      {contextHolder}
      <>
        <Button type="primary" id="crt_btn" onClick={showModal}>
          Create
        </Button>
        <Modal
          title="Create New Sunglasses"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <form onSubmit={handleProduct}>
            <input
              type="text"
              value={img}
              onChange={(e) => setImg(e.target.value)}
              placeholder="Image URL"
              className="form-control"
              style={{ borderRadius: "0px", margin: "10px 0px" }}
            />
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              className="form-control"
              style={{ borderRadius: "0px", margin: "10px 0px" }}
            />
            <input
              type="text"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="Description"
              className="form-control"
              style={{ borderRadius: "0px", margin: "10px 0px" }}
            />
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Price"
              className="form-control"
              style={{ borderRadius: "0px", margin: "10px 0px" }}
            />
            <input
              type="text"
              value={sizes}
              onChange={(e) => setSizes(e.target.value)}
              placeholder="Sizes"
              className="form-control"
              style={{ borderRadius: "0px", margin: "10px 0px" }}
            />
            <button className="btn btn-outline-primary" onClick={handleProduct}>
              Add
            </button>
          </form>
        </Modal>
      </>
      <LeftOutlined onClick={()=>navigate(-1)} id="back_btn2" />
      <p style={{ textAlign: "center", fontSize: "20px", marginTop: "5px" }}>
      Sunglasses
      </p>
      <div className="jeans">
        {sunglasses?.map((val, idx) => {
          return (
            <div className="card" id="cards" key={idx}>
              <Image.PreviewGroup>
                <Image src={val.img} style={{ height: "400px" }} />
              </Image.PreviewGroup>
              <div className="card-body">
                <h4 className="card-title">
                  <b>{val.title}</b>
                </h4>
                <p className="card-text">{val.desc}</p>
                <b>${val.price}</b>
                <br />
                <DeleteOutlined
                  id="delete_bnt"
                  onClick={() => {
                    error();
                    removeCreates(val.id);
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CreateSunglasses;

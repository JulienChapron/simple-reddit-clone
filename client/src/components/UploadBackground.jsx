import React, {
  useState,
  useEffect,
  useContext,
  useRef,
  useCallback,
} from 'react';
import { Button, Modal } from 'react-bootstrap';
import penIcon from '../assets/icons/pen.png';
import axios from 'axios';
import { authContext } from '../contexts/Auth';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

const UploadAvatar = (props) => {
  const [show, setShow] = useState(false);
  const [upImg, setUpImg] = useState();
  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);
  const [crop, setCrop] = useState({ unit: '%', width: 100, aspect: 16 / 5 });
  const [completedCrop, setCompletedCrop] = useState(null);
  const { auth } = useContext(authContext);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const [loading, setLoading] = useState(false);
  const [display, setDisplay] = useState(false);
  const generateDownload = (canvas, crop) => {
    if (!crop || !canvas) {
      return;
    }
    let file = null;
    canvas.toBlob((blob) => {
      file = new File([blob], 'fileName.jpg', { type: 'image/jpeg' });
      setLoading(true);
      const formData = new FormData();
      formData.append('image', file);
      const config = {
        headers: {
          authorization: `Bearer ${auth.token}`,
          'content-type': 'multipart/form-data',
        },
      };
      axios
        .post(
          `http://localhost:4000/api/v1/subreddits/${props.data.subreddit}/background`,
          formData,
          config
        )
        .then((response) => {
          setLoading(false);
        })
        .catch((error) => {});
    });
    setShow(false);
  };

  const onSelectFile = (e) => {
    setDisplay(true);
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () => setUpImg(reader.result));
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const onLoad = useCallback((img) => {
    imgRef.current = img;
  }, []);

  useEffect(() => {
    if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
      return;
    }

    const image = imgRef.current;
    const canvas = previewCanvasRef.current;
    const crop = completedCrop;

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext('2d');
    const pixelRatio = window.devicePixelRatio;

    canvas.width = crop.width * pixelRatio;
    canvas.height = crop.height * pixelRatio;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = 'high';

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );
  }, [completedCrop]);
  return (
    <div>
      <div>
        {display ? (
          <canvas
            ref={previewCanvasRef}
            style={{
              maxWidth: '100%',
              maxHeight: '100px',
              width: Math.round(completedCrop?.width ?? 0),
              height: Math.round(completedCrop?.height ?? 0),
            }}
          />
        ) : (
          <img
            style={{ width: '100%', height: '100px' }}
            src={`http://localhost:4000/uploads/${props.type}/background/${props.data.backgroundUrl}`}
            alt="image-subreddit"
          />
        )}
      </div>
      <img
        style={{
          cursor: 'pointer',
          position: 'absolute',
          right: '20px',
          top: '80px',
          background: '#fff',
          border: '1px solid grey',
          height: '35px',
          width: '35px',
          borderRadius: '100%',
        }}
        src={penIcon}
        onClick={handleShow}
        className="icon"
        alt="icon-pen"
      />
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Resize your avatar</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <input type="file" accept="image/*" onChange={onSelectFile} />
          </div>
          <ReactCrop
            src={upImg}
            onImageLoaded={onLoad}
            crop={crop}
            onChange={(c) => setCrop(c)}
            onComplete={(c) => setCompletedCrop(c)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            disabled={!completedCrop?.width || !completedCrop?.height}
            onClick={() =>
              generateDownload(previewCanvasRef.current, completedCrop)
            }
            variant="primary"
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
export default UploadAvatar;

import React, { useEffect, useState } from "react";
import useStyles from "./styles";
import { Card, CardActionArea, CardMedia, Typography } from "@material-ui/core";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper";
import "swiper/swiper-bundle.css";
import "../../../../theme/swiper-styles.css";
import { getFreeProductCategoryList } from "../../../../api/api_content";
import { toast } from "material-react-toastify";
import Loading from "../../../../components/Loading/Loading";

SwiperCore.use([Navigation]);

const FreeSection = () => {
  const classes = useStyles();
  const [isLoading, setLoading] = useState(true);
  const [product, setProduct] = useState([1]);

  useEffect(() => {
    getFreeProductCategoryList((isOk, data) => {
      if (!isOk) return toast.warning(data.message);
      setProduct(data);
      setLoading(false);
    });
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className={classes.root}>
      <Typography variant={"h4"} component={"h1"}>
        رایگان های تاک
      </Typography>
      <section className={classes.container}>
        <Swiper
          breakpoints={{
            // when window width is >= 640px
            640: {
              width: 800,
              slidesPerView: 1,
            },
            // when window width is >= 768px
            768: {
              width: 500,
              slidesPerView: 2,
            },
          }}
          id="main"
          width="480"
          navigation
          // spaceBetween={15}
        >
          {product.map((item) => {
            return (
              <>
                <SwiperSlide>
                  <Card className={classes.card}>
                    <CardActionArea>
                      <CardMedia
                        className={classes.media}
                        image={`${item.pic}`}
                      />
                      <section className={classes.containerContent}>
                        <Typography
                          className={classes.title}
                          variant="body1"
                          component="h4"
                        >
                          {item.title}
                        </Typography>
                        <section className={classes.lineCenter}>
                          <h5 className={classes.author}>{item.author}</h5>
                          <Typography
                            variant={"subtitle2"}
                            component={"h6"}
                            className={classes.badge}
                          >
                            {item.rate}
                          </Typography>
                        </section>
                        <section className={classes.lastLine}>
                          <h4>قیمت:</h4>
                          <Typography
                            variant={"subtitle1"}
                            component={"h6"}
                            className={classes.price}
                          >
                            {item.price}
                          </Typography>
                        </section>
                      </section>
                    </CardActionArea>
                  </Card>
                </SwiperSlide>
              </>
            );
          })}
        </Swiper>
      </section>
    </div>
  );
};

export default FreeSection;

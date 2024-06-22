import { Box, Heading, Spinner } from "@chakra-ui/react";
import { PromoList } from "../list/PromoList.jsx";
import ShowMoreButton from "../../../css/theme/component/button/ShowMoreButton.jsx";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import PromoCarousel from "../PromoCarousel.jsx";

export function PromoAll() {
  const navigate = useNavigate();
  const [promoList, setPromoList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllPromotions = async () => {
      try {
        const { data } = await axios.get(`/api/promotion/list-all`);
        const now = new Date();
        const activePromos = data.promotionList.filter(
          (promo) => new Date(promo.eventEndDate) >= now,
        );
        setPromoList(activePromos);
      } catch (error) {
        console.error("Error fetching promotions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllPromotions();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  const renderPromoSection = (title, eventType) => (
    <Box>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Heading mt={5} style={{ whiteSpace: "nowrap" }} fontSize="25px">
          {title}
        </Heading>
        <ShowMoreButton
          buttonOnclick={() => navigate(`/promotion/${eventType}`)}
        />
      </Box>
      <PromoList
        eventType={eventType}
        eventStatusList={promoList.filter(
          (promo) => promo.eventType === eventType,
        )}
        maxItems={3}
        showTotalPosts={false}
        showSearch={false}
        showPagination={false}
      />
    </Box>
  );

  return (
    <Box>
      <Heading>추천 이벤트</Heading>
      <PromoCarousel promoList={promoList} />
      {renderPromoSection("영화", "movie")}
      {renderPromoSection("극장", "theater")}
      {renderPromoSection("멤버십", "membership")}
      {renderPromoSection("제휴/할인", "discount")}
    </Box>
  );
}

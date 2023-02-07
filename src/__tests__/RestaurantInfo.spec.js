import { shallowMount } from "@vue/test-utils";
import RestaurantInfo from "../components/RestaurantInfo";

describe("RestaurantInfo", () => {
  let restaurant;
  let wrapper;

  beforeEach(() => {
    restaurant = {
      id: 1,
      name: "Test Restaurant",
      rating: 4.5,
      location: {
        formatted_address: "123 Main St, Test City, Test State 12345",
      },
      phone: "(123) 456-7890",
      photos: ["https://example.com/photo.jpg"],
      reviews: [
        {
          rating: 5,
          text: "Great food and service!",
        },
        {
          rating: 4,
          text: "Pretty good overall.",
        },
      ],
    };

    wrapper = shallowMount(RestaurantInfo, {
      propsData: {
        restaurant,
      },
    });
  });

  afterEach(() => {
    wrapper.unmount();
  });

  describe("displays restaurant information when restaurant is selected", () => {
    it("displays the .info wrapper element if there is a selected restaurant", () => {
      expect(wrapper.find(".info").exists()).toBe(true);
    });

    it("displays restaurant details", () => {
      expect(wrapper.find(".name").text()).toBe(restaurant.name);
      expect(wrapper.find(".details b:first-of-type").text()).toBe(
        `Rating: ${restaurant.rating}`
      );
      expect(wrapper.find(".address").text()).toBe(
        restaurant.location.formatted_address
      );
      expect(
        wrapper.find('img[data-test="@/assets/marker-icon.svg"]').exists()
      ).toBeTruthy();
      expect(wrapper.find(".phone").text()).toBe(restaurant.phone);
      expect(
        wrapper.find('img[data-test="@/assets/phone-icon.svg"]').exists()
      ).toBeTruthy();
      expect(
        wrapper
          .find(`.restaurant-image[data-test="${restaurant.photos[0]}"`)
          .exists()
      ).toBeTruthy();
    });

    it("displays restaurant reviews", () => {
      const reviewList = wrapper.findAll("li");
      expect(reviewList.length).toBe(restaurant.reviews.length);
      for (const index in reviewList) {
        const review = restaurant.reviews[index];
        expect(reviewList[index].find("b").text()).toBe(
          `Rating: ${review.rating}`
        );
        expect(reviewList[index].find("p").text()).toBe(review.text);
      }
    });
  });

  it("displays a message when no restaurant is selected", async () => {
    await wrapper.setProps({ restaurant: undefined });
    expect(wrapper.find(".no-restaurant-selected").exists()).toBe(true);
  });
});

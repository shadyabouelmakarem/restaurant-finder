import { mount } from "@vue/test-utils";
import RestaurantList from "../components/RestaurantList";
import ServerResponse from "../../data.json";
import { parseLocation } from "../helpers/location";

const data = ServerResponse.data.search.business;

describe("RestaurantList", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(RestaurantList);
  });
  afterEach(() => {
    wrapper.unmount();
  });

  it("renders the correct number of restaurants", () => {
    expect(wrapper.find(".restaurant-list p").text()).toBe(
      `${data.length} Restaurants`
    );
  });

  it("renders the restaurants list correctly", () => {
    const restaurants = wrapper.findAll("li");
    for (const index in restaurants) {
      expect(restaurants[index].find(":first-child").text()).toEqual(
        data[index].name
      );
      expect(
        restaurants[index]
          .find('img[data-test="@/assets/marker-icon.svg"')
          .exists()
      ).toBeTruthy();
      expect(restaurants[index].find(".restaurant-address").text()).toEqual(
        parseLocation(data[index].location)
      );
    }
  });

  it('emits "selectRestaurant" event when a restaurant is selected', () => {
    wrapper.find("li").trigger("click");
    expect(wrapper.emitted().selectRestaurant).toBeTruthy();
  });
});

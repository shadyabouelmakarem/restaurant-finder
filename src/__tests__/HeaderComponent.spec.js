import { mount } from "@vue/test-utils";
import HeaderComponent from "../components/HeaderComponent.vue";

describe("HeaderComponent", () => {
  it("renders the header with the correct text", () => {
    const wrapper = mount(HeaderComponent);
    expect(wrapper.text()).toBe("Restaurant finder");
  });
});

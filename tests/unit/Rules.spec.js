import { shallowMount } from "@vue/test-utils";
import Rules from "@/components/Rules.vue";

describe("HelloWorld.vue", () => {
  it("renders props.msg when passed", () => {
    const dialog = false;
    const wrapper = shallowMount(Rules, {
      data() {
        return {
          dialog: dialog
        };
      }
    });
    console.log(wrapper.find("v-dialog"));
    expect(wrapper.find("v-dialog").value).toBe(false);
  });
});

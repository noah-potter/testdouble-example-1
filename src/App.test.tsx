import td from "testdouble";

interface DogOptions {
  color: string;
}

class AnimalBuilder {
  // Doesn't matter
  configure(options: any): AnimalBuilder {
    return this;
  }

  makeNoise() {}
}

class DogBuilder {
  constructor(animalBuilder: AnimalBuilder, dogOptions: DogOptions) {
    animalBuilder.configure(dogOptions).makeNoise();
  }
}

test("test DogBuilder", () => {
  const animalBuilder = td.object<AnimalBuilder>();
  const dogOptions = td.object<DogOptions>();

  // Non-working version
  // td.when(animalBuilder.configure(dogOptions)).thenReturn({
  //   makeNoise: td.func()
  // });

  // Working version
  // td.when(
  //   animalBuilder.configure(
  //     td.matchers.argThat((options: any) => {
  //       return options === dogOptions;
  //     })
  //   )
  // ).thenReturn({
  //   makeNoise: td.func()
  // });

  new DogBuilder(animalBuilder, dogOptions);
});

import "../CSS/Home.css";

export default function Home({ isLoggedIn }) {
  return isLoggedIn ? (
    <>
      <div id="homepage" class="container-fluid">
        <main class="px-3">
          <h1>Welcome to the Revature Card Room</h1>
          <br />
          <p class="lead">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Interdum
            velit euismod in pellentesque massa placerat duis ultricies lacus.
            Dictumst vestibulum rhoncus est pellentesque elit ullamcorper
            dignissim cras. Et malesuada fames ac turpis egestas integer eget
            aliquet. Vitae sapien pellentesque habitant morbi tristique
            senectus. Ut porttitor leo a diam sollicitudin tempor id eu. In est
            ante in nibh mauris cursus mattis molestie. Volutpat maecenas
            volutpat blandit aliquam. Pharetra convallis posuere morbi leo urna.
            Convallis a cras semper auctor neque vitae tempus quam pellentesque.
            Sodales ut eu sem integer vitae justo eget magna fermentum.
            Scelerisque eu ultrices vitae auctor eu augue ut. Volutpat blandit
            aliquam etiam erat. Pharetra vel turpis nunc eget lorem dolor sed
            viverra. Duis convallis convallis tellus id. Ultrices gravida dictum
            fusce ut placerat orci nulla. Cursus metus aliquam eleifend mi in
            nulla posuere sollicitudin. Mauris augue neque gravida in fermentum.
            Sed enim ut sem viverra. Aenean euismod elementum nisi quis eleifend
            quam adipiscing vitae. Etiam dignissim diam quis enim lobortis
            scelerisque fermentum. Ut ornare lectus sit amet est placerat in
            egestas. Ultricies mi quis hendrerit dolor magna eget. Lorem mollis
            aliquam ut porttitor leo a diam sollicitudin. Sed risus pretium quam
            vulputate dignissim suspendisse in est. Adipiscing elit duis
            tristique sollicitudin nibh sit amet commodo nulla. Pellentesque nec
            nam aliquam sem. Mi bibendum neque egestas congue quisque egestas
            diam in. Facilisi cras fermentum odio eu feugiat pretium nibh ipsum.
            Dis parturient montes nascetur ridiculus mus mauris vitae ultricies
            leo. Laoreet suspendisse interdum consectetur libero id faucibus.
            Elementum sagittis vitae et leo duis. Pharetra et ultrices neque
            ornare aenean. Et tortor consequat id porta nibh venenatis cras sed
            felis. Vitae tortor condimentum lacinia quis vel. Ut eu sem integer
            vitae. Id donec ultrices tincidunt arcu. Eget aliquet nibh praesent
            tristique magna. Nisi lacus sed viverra tellus in hac habitasse.
            Commodo ullamcorper a lacus vestibulum sed. Tortor condimentum
            lacinia quis vel eros donec ac odio. Id interdum velit laoreet id
            donec ultrices tincidunt arcu. Libero nunc consequat interdum
            varius. Vel quam elementum pulvinar etiam non quam lacus
            suspendisse. Enim neque volutpat ac tincidunt vitae semper quis
            lectus nulla. Dolor sit amet consectetur adipiscing elit ut aliquam.
            Volutpat blandit aliquam etiam erat velit scelerisque in dictum.
            Malesuada nunc vel risus commodo viverra maecenas accumsan lacus.
            Orci a scelerisque purus semper eget duis at. Ornare massa eget
            egestas purus viverra. Neque sodales ut etiam sit amet nisl purus in
            mollis. Amet cursus sit amet dictum sit. Lobortis elementum nibh
            tellus molestie nunc non blandit. Non tellus orci ac auctor augue
            mauris augue neque gravida. Aliquet nec ullamcorper sit amet risus
            nullam. Eget lorem dolor sed viverra ipsum nunc aliquet. Nullam non
            nisi est sit amet facilisis magna etiam tempor. Lacus luctus
            accumsan tortor posuere ac ut consequat semper viverra. Mauris
            rhoncus aenean vel elit scelerisque. Luctus venenatis lectus magna
            fringilla urna porttitor. Et netus et malesuada fames ac turpis
            egestas maecenas pharetra. Mi sit amet mauris commodo quis imperdiet
            massa tincidunt. Nisl vel pretium lectus quam id leo in. Quam
            elementum pulvinar etiam non quam lacus suspendisse faucibus. In
            vitae turpis massa sed elementum tempus egestas sed. Dictum at
            tempor commodo ullamcorper a lacus vestibulum sed arcu. Tortor id
            aliquet lectus proin nibh. Facilisis magna etiam tempor orci. Sem
            viverra aliquet eget sit amet. Vestibulum lectus mauris ultrices
            eros. Morbi leo urna molestie at elementum. Nisi quis eleifend quam
            adipiscing vitae proin sagittis nisl rhoncus. Tellus molestie nunc
            non blandit massa enim nec dui nunc. Molestie nunc non blandit massa
            enim nec. Nulla facilisi nullam vehicula ipsum a arcu. Tellus rutrum
            tellus pellentesque eu.
          </p>
          <p class="lead">
            <a
              href="#"
              class="btn btn-lg btn-secondary fw-bold border-black bg-black"
            >
              Learn more
            </a>
          </p>
        </main>

        <footer class="mt-auto text-white-50">
          <p>
            Cover template for{" "}
            <a href="https://getbootstrap.com/" class="text-white">
              Bootstrap
            </a>
            , by{" "}
            <a href="https://twitter.com/mdo" class="text-white">
              @mdo
            </a>
            .
          </p>
        </footer>
      </div>
    </>
  ) : (
    <div id="homepage" class="container-fluid">
      <h1>Home Page Not Logged In!</h1>
    </div>
  );
}

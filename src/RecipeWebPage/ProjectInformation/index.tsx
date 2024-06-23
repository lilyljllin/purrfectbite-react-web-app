import { GoHeartFill } from "react-icons/go";
import { PiCat } from "react-icons/pi";
export default function ProjectInformation() {
    return (
        <div id="project-information" className="container-fluid">
            <h2>About This Project <PiCat /><GoHeartFill /> :</h2>
            <table className="table">
                    <tbody className="align-top">
                        <tr>
                            <td><strong>First Name </strong></td>
                            <td>Jia-Li</td>
                        </tr>
                        <br />
                        <tr>
                            <td><strong>Last Name </strong></td>
                            <td>Lin</td>
                        </tr>
                        <br/>
                        <tr>
                            <td><strong>Section </strong></td>
                            <td>Web Development Summer 1</td>
                        </tr>
                        <br />
                        <tr>
                            <td><strong>Team </strong></td>
                            <td>Web Dev Team 14</td>
                        </tr>
                        <br />
                        <tr>
                            <td><strong>Github </strong></td>
                            <td><a href="https://github.com/lilyljllin/purrfectbite-react-web-app" className="brown-link">React Web Github Page</a></td>
                        </tr>
                        <br />
                        <tr>
                            <td><strong></strong></td>
                            <td><a href="https://github.com/lilyljllin/purrfectbite-node-server-app" className="brown-link">Node Server Github Page</a></td>
                        </tr>
                        <br />
                        
                    </tbody>
                </table>
        </div>
    );
}
import React, {Component, ReactPortal} from 'react';
import ReactDOM from 'react-dom';

class PortalComponent extends Component<any,any> {
    constructor(props:any) {
        super(props);

        this.state = {
            maxValue: props.maxValue,
            currentValue: 0
        }
    }

    valueChanged = (event: any) => {
        console.log("valueChanged!");
        this.setState({
            currentValue: event.target.value
        })
    };

    render() {
        return (
            <input type="range"
                   value={this.state.currentValue}
                   min={0}
                   max={10}
                   step={1}
                   onChange={this.valueChanged}/>
        )
    }
}

class Library {
    private parentComponent: any;

    constructor(parentComponent: any) {
        this.parentComponent = parentComponent;
    }

    public createReactComponent() {
        const ReactComponent = React.createElement(PortalComponent);

        // works
        // const componentParent = document.createElement('div');

        // doesn't work
        const componentParent = document.createDocumentFragment();

        const portal: ReactPortal = ReactDOM.createPortal(
            ReactComponent,
            componentParent as any
        );
        this.parentComponent.mountReactPortal(portal);

        setTimeout(() => {
            document.getElementById('root')!.appendChild(componentParent)
        })
    }
}

class PortalApp extends Component {
    private portals: ReactPortal[] = [];
    private library!: Library;

    constructor(props: any) {
        super(props);
    }

    componentDidMount(): void {
        this.library = new Library(this);
        this.library.createReactComponent();
    }


    render() {
        return React.createElement<any>("div",
            {
                style: {height: 200, width: 200, backgroundColor: "lightblue"},
            },
            this.portals
        );
    }

    mountReactPortal(portal: ReactPortal) {
        this.portals = [...this.portals, portal];
        this.forceUpdate(() => {
        });
    }
}

export default PortalApp;

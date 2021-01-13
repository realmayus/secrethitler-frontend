/*
Modified version of https://github.com/hyperfuse/react-anime
MIT License
Copyright (c) 2019 HyperFuse
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import React, { Component, Fragment } from "react";
import anime from "animejs";

export default class Anime extends Component {
    props;

    targets;
    targetRefs;
    anime;

    constructor(props) {
        super(props);

        // Current Anime DOM Targets
        this.targets = [];
        this.targetRefs = [];
        this.anime = null;
    }

    componentDidMount() {
        this.createAnime();
    }

    createAnime = () => {
        let props = this.props;
        if (this.targets.length > 0 && this.anime !== undefined) {
            anime.remove(this.targets);
        }

        this.targets = [];
        for (let ref of this.targetRefs) {
            if (ref.current) {
                this.targets.push(ref.current);
            }
        }

        let animeProps = { ...props, targets: this.targets };
        delete animeProps.children;
        delete animeProps.svg;
        this.anime = anime(animeProps);
    };

    // Render children, and their diffs until promise of anime finishes.
    render() {
        let children = this.props.children;
        let refs = this.targetRefs;
        if (!Array.isArray(children)) children = [children];
        return (
            <Fragment>
                {children.map((child, i) => {
                    refs.push(React.createRef());
                    let El = this.props.svg ? "g" : "div";
                    return (
                        <El ref={refs[refs.length - 1]} key={`__anime__${i}`}>
                            {child}
                        </El>
                    );
                })}
            </Fragment>
        );
    }
}

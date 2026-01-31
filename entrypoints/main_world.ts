import {
    add_cell_of_shape,
    add_edge,
    add_new_rectangle,
    delete_cell_by_id,
    edit_cell,
    edit_edge,
    set_cell_shape,
    set_cell_data,
    get_shape_by_name,
    get_shape_categories,
    get_shapes_in_category,
    list_paged_model,
} from "@/drawio";
import {on_standard_tool_request_from_server} from "../bus";
import {DrawioUI} from "../types";

export default defineUnlistedScript(() => {
    console.log("Hello from the main world");
    const checkInterval = setInterval(() => {
        if (window.ruleeng) {
            // window.ruleeng.addrule("测试")
            clearInterval(checkInterval);
            // window.Draw.loadPlugin((ui: DrawioUI) => {
            //   console.log("plugin loaded", ui);
            //   const { editor } = ui;
            //   const { graph } = editor;
            //   const mxUtils = window.mxUtils;
            //
            //   //TODO: just for testing / exploring Draw.io
            //   // window.ui = ui;
            //   // window.editor = editor;
            //   // window.graph = graph;
            //
            const TOOL_get_selected_cell = "get-selected-cell";
            on_standard_tool_request_from_server(
                TOOL_get_selected_cell,
                window.ruleeng,
                new Set([]),
                (ruleeng, _options) => {
                    const result = ruleeng.ui.getSelectElements(true) || "no cell selected";
                    return result;
                },
            );
            //
            const TOOL_add_node = "add-node";
            on_standard_tool_request_from_server(
                TOOL_add_node,
                window.ruleeng,
                new Set(["x", "y", "type", "text"]),
                (ruleeng, _options) => {
                    const result = ruleeng.ui.addNode({
                        type: _options.type,
                        x: _options.x,
                        y: _options.y,
                        text: _options.text,
                    });
                    console.log("addnode result: ", result)
                    return "添加节点成功";
                },
            );
            //
            const TOOL_delete_cell_by_id = "delete-node-by-id";
            on_standard_tool_request_from_server(
                TOOL_delete_cell_by_id,
                window.ruleeng,
                new Set(["nodeId"]),
                (ruleeng, _options) => {
                    const result = ruleeng.ui.deleteNode(_options.nodeId);
                    console.log("delete result: ", result)
                    return "删除节点成功";
                },
            );
            const TOOL_set_paramsassign_node_conf = "edit-params-assign-node-conf";
            on_standard_tool_request_from_server(
                TOOL_set_paramsassign_node_conf,
                window.ruleeng,
                new Set(["nodeId", "config"]),
                (ruleeng, _options) => {
                    const result = ruleeng.ui.getNodeModelById(_options.nodeId)
                        .setProperties(_options.config);
                    console.log("edit-node-conf result: ", result)
                    return "编辑节点成功";
                },
            );
            const TOOL_set_switchto_node_conf = "edit-switchto-node-conf";
            on_standard_tool_request_from_server(
                TOOL_set_switchto_node_conf,
                window.ruleeng,
                new Set(["nodeId", "config"]),
                (ruleeng, _options) => {
                    const result = ruleeng.ui.getNodeModelById(_options.nodeId)
                        .setProperties(_options.config);
                    console.log("edit-node-conf result: ", result)
                    return "编辑节点成功";
                },
            );

            const TOOL_set_calculate_node_conf = "edit-calculate-node-conf";
            on_standard_tool_request_from_server(
                TOOL_set_calculate_node_conf,
                window.ruleeng,
                new Set(["nodeId", "config"]),
                (ruleeng, _options) => {
                    const result = ruleeng.ui.getNodeModelById(_options.nodeId)
                        .setProperties(_options.config);
                    console.log("edit-node-conf result: ", result)
                    return "编辑节点成功";
                },
            );
            //
            const TOOL_add_edge = "add-edge";
            on_standard_tool_request_from_server(
                TOOL_add_edge,
                window.ruleeng,
                new Set(["sourceNodeId", "targetNodeId"]),
                (ruleeng, _options) => {
                    const result = ruleeng.ui.addEdge({
                        sourceNodeId: _options.sourceNodeId,
                        targetNodeId: _options.targetNodeId,
                    });
                    console.log("addnode result: ", result)
                    return "添加节点连接边成功";
                },
            );

            const TOOL_delete_edge_by_id = "delete-edge-by-id";
            on_standard_tool_request_from_server(
                TOOL_delete_edge_by_id,
                window.ruleeng,
                new Set(["edgeId"]),
                (ruleeng, _options) => {
                    const result = ruleeng.ui.deleteEdge(_options.edgeId);
                    console.log("delete result: ", result)
                    return "删除边成功";
                },
            );

              const TOOL_get_nodes_categories = "get-nodes-categories";
              on_standard_tool_request_from_server(
                  TOOL_get_nodes_categories,
                  window.ruleeng,
                new Set([]),
                  (ruleeng, _options) => {
                      const result = ruleeng.assist.nodeslist();
                      console.log("TOOL_get_nodes_categories: ", result)
                      return result;
                  },
              );
            //
            //   const TOOL_get_shapes_in_category = "get-shapes-in-category";
            //   on_standard_tool_request_from_server(
            //     TOOL_get_shapes_in_category,
            //     ui,
            //     new Set(["category_id"]),
            //     get_shapes_in_category,
            //   );
            //
            //   const TOOL_get_shape_by_name = "get-shape-by-name";
            //   on_standard_tool_request_from_server(
            //     TOOL_get_shape_by_name,
            //     ui,
            //     new Set(["shape_name"]),
            //     get_shape_by_name,
            //   );
            //
            //   const TOOL_add_cell_of_shape = "add-cell-of-shape";
            //   on_standard_tool_request_from_server(
            //     TOOL_add_cell_of_shape,
            //     ui,
            //     new Set(["x", "y", "width", "height", "text", "style"]),
            //     add_cell_of_shape,
            //   );
            //
            //   const TOOL_set_cell_shape = "set-cell-shape";
            //   on_standard_tool_request_from_server(
            //     TOOL_set_cell_shape,
            //     ui,
            //     new Set(["cell_id", "shape_name"]),
            //     set_cell_shape,
            //   );
            //
            //   const TOOL_set_cell_data = "set-cell-data";
            //   on_standard_tool_request_from_server(
            //     TOOL_set_cell_data,
            //     ui,
            //     new Set(["cell_id", "key", "value"]),
            //     set_cell_data(mxUtils),
            //   );
            //
            const TOOL_list_paged_model = "get-graph-data";
            on_standard_tool_request_from_server(
                TOOL_list_paged_model,
                window.ruleeng,
                new Set([]),
                (ruleeng, _options) => {
                    const result = ruleeng.ui.getGraphData()
                    console.log("get graph: ", result)
                    return result;
                },
            );

            const TOOL_get_flow_params = "get-flow-params";
            on_standard_tool_request_from_server(
                TOOL_get_flow_params,
                window.ruleeng,
                new Set([]),
                (ruleeng, _options) => {
                    const result = ruleeng.assist.getflowparams()
                    console.log("flow params: ", result)
                    return result;
                },
            );
            //
            //   const TOOL_edit_cell = "edit-cell";
            //   on_standard_tool_request_from_server(
            //     TOOL_edit_cell,
            //     ui,
            //     new Set(["cell_id", "text", "x", "y", "width", "height", "style"]),
            //     edit_cell,
            //   );
            //
            //   const TOOL_edit_edge = "edit-edge";
            //   on_standard_tool_request_from_server(
            //     TOOL_edit_edge,
            //     ui,
            //     new Set(["cell_id", "text", "source_id", "target_id", "style"]),
            //     edit_edge,
            //   );
            // });
        } else {
            const el = document.querySelector(
                "body > div.geMenubarContainer > div.geMenubar > div > button",
            );
            if (el) {
                el.innerHTML = Date.now().toString();
            }
        }
    }, 1000);
});

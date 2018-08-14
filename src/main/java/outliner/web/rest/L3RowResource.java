package outliner.web.rest;

import static org.elasticsearch.index.query.QueryBuilders.queryStringQuery;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.codahale.metrics.annotation.Timed;

import io.github.jhipster.web.util.ResponseUtil;
import outliner.domain.L3Row;
import outliner.repository.L3RowRepository;
import outliner.repository.search.L3RowSearchRepository;
import outliner.web.rest.errors.BadRequestAlertException;
import outliner.web.rest.util.HeaderUtil;

/**
 * REST controller for managing L3Row.
 */
@RestController
@RequestMapping("/api")
public class L3RowResource {


    private final Logger log = LoggerFactory.getLogger(L3RowResource.class);

    private static final String ENTITY_NAME = "l3Row";

    private final L3RowRepository l3RowRepository;

    private final L3RowSearchRepository l3RowSearchRepository;

    public L3RowResource(L3RowRepository l3RowRepository, L3RowSearchRepository l3RowSearchRepository) {
        this.l3RowRepository = l3RowRepository;
        this.l3RowSearchRepository = l3RowSearchRepository;
    }

    /**
     * POST  /l-3-rows : Create a new l3Row.
     *
     * @param l3Row the l3Row to create
     * @return the ResponseEntity with status 201 (Created) and with body the new l3Row, or with status 400 (Bad Request) if the l3Row has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/l-3-rows")
    @Timed
    public ResponseEntity<L3Row> createL3Row(@Valid @RequestBody L3Row l3Row) throws URISyntaxException {
        log.debug("REST request to save L3Row : {}", l3Row);
        if (l3Row.getId() != null) {
            throw new BadRequestAlertException("A new l3Row cannot already have an ID", ENTITY_NAME, "idexists");
        }
        L3Row result = l3RowRepository.saveAndFlush(l3Row);
        //EntityManager flush should be called here
        l3RowSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/l-3-rows/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /l-3-rows : Updates an existing l3Row.
     *
     * @param l3Row the l3Row to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated l3Row,
     * or with status 400 (Bad Request) if the l3Row is not valid,
     * or with status 500 (Internal Server Error) if the l3Row couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/l-3-rows")
    @Timed
    public ResponseEntity<L3Row> updateL3Row(@Valid @RequestBody L3Row l3Row) throws URISyntaxException {
        log.debug("REST request to update L3Row : {}", l3Row);
        if (l3Row.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        L3Row result = l3RowRepository.saveAndFlush(l3Row);
        //EntityManager flush should be called here
        l3RowSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, l3Row.getId().toString()))
            .body(result);
    }

    /**
     * GET  /l-3-rows : get all the l3Rows.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of l3Rows in body
     */
    @GetMapping("/l-3-rows")
    @Timed
    public List<L3Row> getAllL3Rows() {
        log.debug("REST request to get all L3Rows");
        return (List<L3Row>) l3RowRepository.findAll();
    }

    /**
     * GET  /l-3-rows/:id : get the "id" l3Row.
     *
     * @param id the id of the l3Row to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the l3Row, or with status 404 (Not Found)
     */
    @GetMapping("/l-3-rows/{id}")
    @Timed
    public ResponseEntity<L3Row> getL3Row(@PathVariable Long id) {
        log.debug("REST request to get L3Row : {}", id);
        Optional<L3Row> l3Row = l3RowRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(l3Row);
    }

    /**
     * DELETE  /l-3-rows/:id : delete the "id" l3Row.
     *
     * @param id the id of the l3Row to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/l-3-rows/{id}")
    @Timed
    public ResponseEntity<Void> deleteL3Row(@PathVariable Long id) {
        log.debug("REST request to delete L3Row : {}", id);

        l3RowRepository.deleteById(id);
        l3RowSearchRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/l-3-rows?query=:query : search for the l3Row corresponding
     * to the query.
     *
     * @param query the query of the l3Row search
     * @return the result of the search
     */
    @GetMapping("/_search/l-3-rows")
    @Timed
    public List<L3Row> searchL3Rows(@RequestParam String query) {
        log.debug("REST request to search L3Rows for query {}", query);
        return StreamSupport
            .stream(l3RowSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }

}
